import express from "express";
import { createCompany, getCompanyDetails, getCompanyDetailsById } from "../controller/CompanyController";

export const CompanyRouter = express.Router();

CompanyRouter.post("/", createCompany);
CompanyRouter.get("/", getCompanyDetails);
CompanyRouter.get("/:id", getCompanyDetailsById);

export default CompanyRouter;
