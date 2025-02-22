import { Request, Response } from "express";
import College from "../models/Collage"; 


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

  