import express from "express";
import { getExperienceByCollege } from "../controller/ExperienceController";

export const ExperienceRouter = express.Router();

ExperienceRouter.get("/get-experience-by-college", getExperienceByCollege);

export default ExperienceRouter;
