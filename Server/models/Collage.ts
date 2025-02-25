import mongoose, { Document, Schema, Model, model } from "mongoose";

interface ICollege extends Document {
  collegeName: string;
  location: string;
  briefDescription?: string;
  websiteUrl?: string;
  contactInformation: string;
  companies: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const collegeSchema: Schema = new Schema(
  {
    collegeName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    briefDescription: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    contactInformation: {
      type: String,
      required: true,
    },
    companies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
  },
  { timestamps: true }
);

const College: Model<ICollege> = model<ICollege>("College", collegeSchema);

export default College;
export { ICollege };