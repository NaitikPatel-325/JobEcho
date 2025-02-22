import mongoose, { Schema } from "mongoose";

interface ICompanyDetails {
    name: string;
    locations:string[];
    website:string;
    info:string;
  }
  
  const CompanySchema = new Schema<ICompanyDetails>({
    name: { type: String, required: true },
    locations: { type: [String], default: undefined },
    website: { type: String, default: undefined },
    info: { type: String, default: undefined }
  });

export const Company = mongoose.model<ICompanyDetails>("Company", CompanySchema);
