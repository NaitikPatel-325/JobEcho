import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  locations: string[];
  website: string;
  info: string;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  locations: { type: [String], required: true },
  website: { type: String, required: true },
  info: { type: String, required: true }
});

const Company = mongoose.model<ICompany>('Company', CompanySchema);
export default Company;
