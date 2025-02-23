import express from "express";
import { getUserDetails, googleSign, logout, updateUserDetails } from "../controller/UserController";
import { getExperiences, submitExperience,getAnalysis } from "../controller/ExperienceController";
import { getColleges,getCompaniesByCollege } from "../controller/CollageController";
import { verifyToken } from "../middleware/verifyToken";
// import { addComment, getComments } from "../controller/CommentController";
// import { getExperienceById, getExperiences, getExperiencesByCompany, submitExperience } from "../controller/ExperienceController";

export const UserAuthRouter = express.Router();

UserAuthRouter.post("/googleSignin", googleSign);
UserAuthRouter.get("/user-details",verifyToken, getUserDetails);
UserAuthRouter.put("/update-user-details",verifyToken,updateUserDetails);
UserAuthRouter.post("/submit-experience",verifyToken,submitExperience);
UserAuthRouter.get("/getallCollages",getColleges);
// UserAuthRouter.get("/getallCollageswithCompany", getCollegesandcompany);
UserAuthRouter.get("/getCollegesandcompany/:id",verifyToken, getCompaniesByCollege);


// UserAuthRouter.get("/InterviewExperience", getExperiences);
UserAuthRouter.get("/InterviewExperience/:id",verifyToken,getExperiences);
// UserAuthRouter.get("/InterviewExperience/:id", getExperienceById); // Fetch experience by ID
// UserAuthRouter.get("/InterviewExperienceByCompany", getExperiencesByCompany); // Fetch by company name

// UserAuthRouter.get("/InterviewExperience/:id/comments", getComments);
// UserAuthRouter.post("InterviewExperience/:id/comments",addComment);
UserAuthRouter.get("/getaipowerdanalysis/:id",verifyToken,getAnalysis);
UserAuthRouter.post("/logout", logout);

export default UserAuthRouter;
