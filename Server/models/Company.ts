import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  college: mongoose.Types.ObjectId[];
  locations: string[];
  website: string;
  info: string;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  college: { type: [mongoose.Types.ObjectId], required: true, ref: "College" }, 
  locations: { type: [String], required: true },
  website: { type: String, required: true },
  info: { type: String, required: true }
});

const Company = mongoose.model<ICompany>('Company', CompanySchema);
export default Company;
