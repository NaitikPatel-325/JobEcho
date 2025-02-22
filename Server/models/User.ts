import mongoose, { Document, Schema, Model, model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  picture?: string;
  collegeName?: string;
  collegeLocation?: string;
  graduationYear?: number;
  branch?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
    },
    collegeName: {
      type: String,
    },
    collegeLocation: {
      type: String,
    },
    graduationYear: {
      type: Number,
    },
    branch: {
      type: String,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
export { IUser };
