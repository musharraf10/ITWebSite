import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import httpStatus from "http-status"

dotenv.config();

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token Received:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    req.user = decoded;  
    console.log("User Decoded:", decoded); 

    next(); 
  } catch (error) {
    console.error("Token Verification Failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(httpStatus.FORBIDDEN).json({ message: 'Access denied' });
  }
  next();
};

export const isEmployee = (req, res, next) => {
  if (!req.user || req.user.role !== 'employee') {
    return res.status(httpStatus.FORBIDDEN).json({ message: 'Access denied' });
  }
  next();
};

export const isthirdParty = (req, res, next) => {
  if (!req.user || req.user.role !== 'thirdParty') {
    return res.status(httpStatus.FORBIDDEN).json({ message: 'Access denied' });
  }
  next();
};