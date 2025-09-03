import { findUserById } from "../dao/userDAO.js";
import { verifyToken } from "../utils/helper.js";

const attachUser = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    req.user = null; // default: guest

    if (token) {
      const decoded = verifyToken(token);
      if (decoded?.id) {
        const user = await findUserById(decoded.id);
        if (user) {
          req.user = user;
        }
      }
    }
  } catch (error) {
    // If token invalid/expired, just continue as guest
    req.user = null;
  }

  next();
};

export default attachUser;