import mongoose, { Schema, Document } from "mongoose";

interface IRound {
  name: string;
  experience: string;
}

interface IExperience {
  company: mongoose.Types.ObjectId; 
  year: string;
  rounds: IRound[];
}

interface IOffer {
  company: mongoose.Types.ObjectId; 
  status: "Selected" | "Rejected";
  package?: string;
}

interface ICompanyDetails {
  name: string;
  locations:string[];
  website:string;
  info:string;
}

export interface IExperienceSubmission extends Document {
  firstName: string;
  lastName: string;
  collegeName: string;
  graduationYear: string;
  experiences: IExperience[];
  offers: IOffer[];
  company: mongoose.Types.ObjectId;
}

const RoundSchema = new Schema<IRound>({
  name: { type: String, required: true },
  experience: { type: String, required: true },
});

const ExperienceSchema = new Schema<IExperience>({
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  year: { type: String, required: true },
  rounds: [RoundSchema],
});

const OfferSchema = new Schema<IOffer>({
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  status: { type: String, enum: ["Selected", "Rejected"], required: true },
  package: { type: String, required: function () { return this.status === "Selected"; } },
});

const CompanySchema = new Schema<ICompanyDetails>({
  name: { type: String, required: true },
  locations: { type: [String], default: undefined },
  website: { type: String, default: undefined },
  info: { type: String, default: undefined }
});


const ExperienceSubmissionSchema = new Schema<IExperienceSubmission>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  collegeName: { type: String, required: true },
  graduationYear: { type: String, required: true },
  experiences: [ExperienceSchema],
  offers: [OfferSchema],
});

const Experience = mongoose.model<IExperienceSubmission>("Experience", ExperienceSubmissionSchema);
export const Company = mongoose.model<ICompanyDetails>("Company", CompanySchema);

export default Experience;
