import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  cookies: any;
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.VITE_JWT_SECRET_KEY!, (err: unknown, decoded: any) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};
