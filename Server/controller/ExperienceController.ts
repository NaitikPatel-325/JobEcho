
import { Request, Response } from "express";
import Experience from "../models/Experience";
import { createCompany } from "./CompanyController";
import Company from "../models/Company";
import mongoose from "mongoose";

export const submitExperience = async (req: Request, res: Response) => {
  try {
    const { experiences, offers, ...rest } = req.body;
    console.log(offers);

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
            return { ...offer, company: companyDoc._id };
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
    const companyId = req.params.id; // Extract company ID from request parameters

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ message: "Invalid company ID" });
      return;
    }

    const experiences = await Experience.find({
      experiences: { 
        $elemMatch: { company: new mongoose.Types.ObjectId(companyId) } 
      }
    })
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
