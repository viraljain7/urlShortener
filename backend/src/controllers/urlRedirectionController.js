import { AppError } from "../errors/AppError.js";
import urlShortenerModel from "../models/urlShortenerModel.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

const urlRedirectionController = async (req, res, next) => {
    const { id } = req.params;
    const url = await urlShortenerModel.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } },
    );
  
    if (url) {
      res.redirect(url.full_url);
    } else {
      return next(new AppError("URL not found", 404));
    }
  };
  
  // Wrap the controller with tryCatchWrapper
  
  export default tryCatchWrapper(urlRedirectionController);