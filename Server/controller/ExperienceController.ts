
import { Request, Response } from "express";
import Experience from "../models/Experience";
import { createCompany } from "./CompanyController";
import Company from "../models/Company";
import mongoose from "mongoose";
import { promises } from "dns";
import axios from "axios";
import { generatePromptResponse } from "../prompt";

export const submitExperience = async (req: Request, res: Response) => {
  try {
    const { experiences, results, ...rest } = req.body;
    const offers = results;

    const companyCache: { [key: string]: any } = {};

    const getCompanyDoc = async (name: string) => {
      if (companyCache[name]) {
        return companyCache[name];
      }
      let companyDoc = await Company.findOne({ name });
      if (!companyDoc) {
        await createCompany({ body: { name } } as any);
        companyDoc = await Company.findOne({ name });
      }
      companyCache[name] = companyDoc;
      return companyDoc;
    };

    const updatedExperiences = await Promise.all(
      experiences.map(async (exp: any) => {
        const name: string = exp.company;
        const companyDoc = await getCompanyDoc(name);
        return { ...exp, company: companyDoc._id };
      })
    );

    const updatedOffers = offers
    ? await Promise.all(
        offers.map(async (offer: any) => {
          const name: string = offer.company;
          const companyDoc = await getCompanyDoc(name);
          return { ...offer, company: companyDoc._id, package: offer.lpa }; // mapping lpa to package if needed
        })
      )
    : [];
  

    const newExperienceSubmission = new Experience({
      ...rest,
      experiences: updatedExperiences,
      offers: updatedOffers,
    });

    await newExperienceSubmission.save();

    const savedDoc = await Experience.findById(newExperienceSubmission._id)
      .populate("experiences.company")
      .populate("offers.company");

    res.status(201).json({
      message: "Experience saved successfully!",
      data: savedDoc,
    });
  } catch (error) {
    console.error("Error saving experience:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExperiences = async (req: Request, res: Response) => {
  console.log("Called!!");
  try {
    const experiences = await Experience.find();
    console.log("Fetched experiences:", experiences);
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

};

export const getExperienceByCompany = async (req: Request, res: Response): Promise<void> => {  
  console.log("Called!!");

  try {
    const companyId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ message: "Invalid company ID" });
      return;
    }

    console.log("Company id : ",companyId);

    const experiences = await Experience.find({
      experiences: { 
        $elemMatch: { company: companyId } 
      }
    })
    .populate("experiences.company", "name website")
    .populate("offers.company", "name")
    .populate("experiences.company", "name website") // Populate company details
    .populate("offers.company", "name") 
    .exec();

    console.log("Experiences for Company:", experiences);
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const fetchAvgPackageDetails = async (req: Request, res: Response): Promise<void> => {
  console.log("Called fetchAvgPackageDetails!!");

  try {
    const companyId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ message: "Invalid company ID" });
      return;
    }

    const experiences = await Experience.find({
      offers: { 
        $elemMatch: { company: new mongoose.Types.ObjectId(companyId) } 
      }
    })
      .populate("experiences.company", "name website")
      .populate("offers.company", "name")
      .exec();

    let totalPackage = 0;
    let count = 0;

    experiences.forEach(expDoc => {
      const matchingOffers = expDoc.offers.filter((offer: any) =>
        offer.company && offer.company._id.toString() === companyId
      );

      matchingOffers.forEach((offer: any) => {
        const packageValue = offer.status === "Selected" && offer.package
          ? Number(offer.package)
          : 0;
        totalPackage += packageValue;
        count++;
      });
    });

    const avgPackage = count > 0 ? totalPackage / count : 0;


    res.status(200).json({
      message: "Fetched company experience details successfully",
      data: {
        avgPackage
      }
    });
  } catch (error) {
    console.error("Error fetching company experience details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAnalysis = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const submissions = await Experience.find({ "experiences.company": id });
    if (!submissions.length) {
      res.status(404).json({ message: "No experiences found for this company" });
      return;
    }

    // Extract experiences for each submission
    const experienceList = submissions.flatMap((submission) =>
      submission.experiences
        .filter((exp) => exp.company.toString() === id)
        .flatMap((exp) =>
          exp.rounds.map((round) => ({
            experienceId: submission._id,
            roundName: round.name,
            experience: round.experience,
          }))
        )
    );

    // const sentimentResponse = await axios.post("https://revana-4ni2.onrender.com/api/v1/youtube-comments",extractedExperiences );

    const summary = experienceList
      .map(exp => `Round ${exp.roundName}: ${exp.experience}`)
      .join("; ");

      const prompt = `The company has recorded the following interview experiences: ${summary}. 
      Please provide a 1-2 line analysis of the company's overall interview process. 
      Each point should highlight a strength or weakness observed in the rounds and include actionable recommendations for future candidates without any special characters
      `;
      

    const analysis = await generatePromptResponse(prompt);
    
    res.status(200).json({
      message: "Analysis generated successfully",
      analysis
    });

  } catch (error) {
    console.error("Error fetching experiences or generating prompt:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


