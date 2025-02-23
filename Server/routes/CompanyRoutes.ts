import express from "express";
import { createCompany, getCompanyDetails, getCompanyDetailsById, getCompanyDetailsByName } from "../controller/CompanyController";
import { verifyToken } from "../middleware/verifyToken";

export const CompanyRouter = express.Router();

CompanyRouter.post("/", createCompany);
CompanyRouter.get("/", getCompanyDetails);
CompanyRouter.get("/:id", getCompanyDetailsById);
CompanyRouter.get("/getbyname/:name",verifyToken,getCompanyDetailsByName);


export default CompanyRouter;
