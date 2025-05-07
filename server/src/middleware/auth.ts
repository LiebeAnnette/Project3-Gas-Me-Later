import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Decoded {
  userId: string;
  email: string;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Missing token" });
    return; // ✅ Stop here
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Decoded;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Invalid or expired token" });
    return; // ✅ Stop here too
  }
}
