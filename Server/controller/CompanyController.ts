
import { Request, Response } from "express";
import { Company } from "../models/Experience";

export const createCompany = async (req:Request) => {
  try {
    const { name, locations, website, info } = req.body;
    console.log(req.body);
    if (!name) {
      console.log(name);
      throw new Error("Name is required");
    }
    const companyData = new Company({
      name,
      locations,
      website,
      info
    });
    await companyData.save();
  } catch (error) {
    console.error("Error saving company:", error);
  }
};

export const getCompanyDetails = async (req: Request, res: Response) => {
  console.log("Called!!");
  try {
    const companyDetails = await Company.find();
    console.log("Fetched experiences:", companyDetails ); // Log the data
    res.status(200).json(companyDetails);
  } catch (error) {
    console.error("Error fetching companyDetails:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCompanyDetailsById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const companyDetails = await Company.findById(id);
        if(!companyDetails){
            res.status(404).json({message: "Company not found"});
            return;
        }
        res.status(200).json(companyDetails);
    } catch (error) {
        console.error("Error fetching companyDetails:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



