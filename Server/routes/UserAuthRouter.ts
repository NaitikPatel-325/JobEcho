import express from "express";
import { getUserDetails, googleSign, logout, updateUserDetails } from "../controller/UserController";
import { getExperiences, submitExperience } from "../controller/ExperienceController";
// import { addComment, getComments } from "../controller/CommentController";
// import { getExperienceById, getExperiences, getExperiencesByCompany, submitExperience } from "../controller/ExperienceController";

export const UserAuthRouter = express.Router();

UserAuthRouter.post("/googleSignin", googleSign);
UserAuthRouter.get("/user-details", getUserDetails);
UserAuthRouter.put("/update-user-details", updateUserDetails);
UserAuthRouter.post("/submit-experience", submitExperience);
// UserAuthRouter.get("/InterviewExperience", getExperiences);
UserAuthRouter.get("/InterviewExperience", getExperiences);
// UserAuthRouter.get("/InterviewExperience/:id", getExperienceById); // Fetch experience by ID
// UserAuthRouter.get("/InterviewExperienceByCompany", getExperiencesByCompany); // Fetch by company name

// UserAuthRouter.get("/InterviewExperience/:id/comments", getComments);
// UserAuthRouter.post("InterviewExperience/:id/comments",addComment);

UserAuthRouter.post("/logout", logout);

export default UserAuthRouter;
