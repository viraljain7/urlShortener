import { findUserById } from "../dao/userDAO.js";
import { verifyToken } from "../utils/helper.js";
import { AppError } from "../errors/AppError.js";

const authMiddleware = async(req, res, next) => {
  // Make sure cookies are parsed (use cookie-parser middleware)
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new AppError("Access denied. No token provided.", 401));
  }

  try {
    // Verify token and decode payload

    const decoded = verifyToken(token);

    const user =await findUserById(decoded.id);
    // Attach user info (payload) to request object for downstream use
    req.user = user;

    next(); // Proceed to next middleware or route handler
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token expired. Please log in again.",
      });
    }
    
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token. Please log in again.",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Authentication failed. Please try again later.",
    });
  }
};

export default authMiddleware;
