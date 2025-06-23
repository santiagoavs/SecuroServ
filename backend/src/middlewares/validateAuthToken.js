import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const validateAuthToken = (allowedUserTypes = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      let token = authHeader && authHeader.split(' ')[1];
      
      if (!token && req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken;
      }

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;

      if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(decoded.userType)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token expired, please log in again" });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "Invalid token" });
      }

      return res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
};