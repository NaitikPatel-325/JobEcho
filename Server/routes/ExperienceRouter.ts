import express from "express";
import { fetchAvgPackageDetails, getExperienceByCompany } from "../controller/ExperienceController";

export const ExperienceRouter = express.Router();

ExperienceRouter.get("/get-experience-by-company/:id", getExperienceByCompany);
ExperienceRouter.get("/get-avg-package/:id",fetchAvgPackageDetails);

export default ExperienceRouter;
