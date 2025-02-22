
import { Request, Response } from "express";
import Experience from "../models/Experience";


export const submitExperience = async (req: Request, res: Response) => {
  try {
    const experienceData = new Experience(req.body);
    await experienceData.save();
    res.status(201).json({ message: "Experience saved successfully!" });
  } catch (error) {
    console.error("Error saving experience:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getExperiences = async (req: Request, res: Response) => {
  console.log("Called!!");
  try {
    const experiences = await Experience.find();
    console.log("Fetched experiences:", experiences); // Log the data
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

};



