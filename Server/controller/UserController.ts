import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

dotenv.config();



const googleClient = new OAuth2Client(process.env.VITE_CLIENT_ID!);

import {RequestHandler } from "express";

import User from "../models/User"; 

export const googleSign: RequestHandler = async (req, res): Promise<void> => {
  console.log("Google Sign-In Request Received!");

  const { idToken } = req.body;
  if (!idToken) {
    res.status(400).json({ message: "Token ID is required" });
    return;
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.VITE_CLIENTID!,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        picture,
      });

      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.VITE_JWT_SECRET_KEY!,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Google Sign-In successful", token, user });

  } catch (err) {
    console.error("❌ Error during Google Sign-In:", err);
    res.status(500).json({ message: "Error signing in with Google", error: err });
  }
};

export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "No token found" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET_KEY!) as { userId: string };

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user, email: user.email });
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
  res.status(200).json({ message: "Logged out successfully" });
};


export const updateUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, collegeName, collegeLocation, graduationYear, branch } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: "Email is required." });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    if (collegeName) user.collegeName = collegeName;
    if (collegeLocation) user.collegeLocation = collegeLocation;
    if (graduationYear) user.graduationYear = graduationYear;
    if (branch) user.branch = branch;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User details updated successfully.",
      data: {
        email: user.email,
        collegeName: user.collegeName,
        collegeLocation: user.collegeLocation,
        graduationYear: user.graduationYear,
        branch: user.branch,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};