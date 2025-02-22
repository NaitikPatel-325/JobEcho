import { Request, Response } from "express";
import College from "../models/Collage"; 
import Company from "../models/Company";
import { promises } from "dns";


export const getColleges = async (req: Request, res: Response) => {
    try {
      const colleges = await College.find();
      res.status(200).json(colleges);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
};
  
export const getCollegeById = async (req: Request, res: Response) => {
    try {
      const college = await College.findById(req.params.id);
      if (!college) return res.status(404).json({ message: "College not found" });
      res.status(200).json(college);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
};

export const getCompaniesByCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const collegeId = req.query.id as string;
    if (!collegeId) {
      res.status(400).json({ error: "College ID is required" });
      return;
    }

    const companies = await Company.find({ collegeIds: { $in: [collegeId] } });

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


