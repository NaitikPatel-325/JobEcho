import express from "express";
import { getExperienceByCompany } from "../controller/ExperienceController";

export const ExperienceRouter = express.Router();

ExperienceRouter.get("/get-experience-by-company/:id", getExperienceByCompany);

export default ExperienceRouter;
