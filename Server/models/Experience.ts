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




const ExperienceSubmissionSchema = new Schema<IExperienceSubmission>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  collegeName: { type: String, required: true },
  graduationYear: { type: String, required: true },
  experiences: [ExperienceSchema],
  offers: [OfferSchema],
});

const Experience = mongoose.model<IExperienceSubmission>("Experience", ExperienceSubmissionSchema);

export default Experience;
