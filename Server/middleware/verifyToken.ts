import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  cookies: any;
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token;
    console.log(req.cookies);
     console.log("token is "+token);
    if (!token) {

      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    jwt.verify(token, process.env.VITE_JWT_SECRET_KEY!, (err: unknown, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}