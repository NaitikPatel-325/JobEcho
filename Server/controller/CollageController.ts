import { Request, Response } from "express";
import College from "../models/Collage"; 
import Experience from "../models/Experience";


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

// export const getCompaniesByCollege = async (req: Request, res: Response) => {
//   try {
//     const {collegeId } = req.query;
//     let college;
//  if (collegeId) {
//       college = await College.findOne({ collegeId }).populate("companies");
//     } else {
//       return res.status(400).json({ success: false, message: "Provide id or collegeId" });
//     }

//     if (!college) {
//       return res.status(404).json({ success: false, message: "College not found" });
//     }

//     res.status(200).json({ success: true, data: college.companies }); // Return only companies
//   } catch (error) {
//     console.error("Error fetching companies by college:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


export const getCompaniesByCollege = async (req: Request, res: Response) => {
  try {
    const { collegeId } = req.query;

    if (!collegeId) {
      return res.status(400).json({ success: false, message: "Provide collegeId" });
    }

    const college = await College.findOne({ collegeId }).populate("companies");

    if (!college) {
      return res.status(404).json({ success: false, message: "College not found" });
    }

    const companiesArray = college.companies.map((company) => ({
      company: company, // Full company object
      id: company._id, // Extracting _id separately
    }));

    return res.status(200).json({ success: true, data: companiesArray });
  } catch (error) {
    console.error("Error fetching companies by college:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
