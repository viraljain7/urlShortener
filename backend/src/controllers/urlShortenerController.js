import { AppError } from "../errors/AppError.js";
import { getShortUrlService } from "../services/urlShortenerService.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

const urlShortenerController = {
  createUrl: tryCatchWrapper(async (req, res, next) => {
    const { url, customUrl } = req.body;

    if (!url) {
      return next(new AppError("URL is required", 400));
    }

    const newUrl = await getShortUrlService(
      url,
      customUrl || null,
      req.user?._id || null
    );

    res.status(201).json({
      success: true,
      message: customUrl
        ? "Custom URL created successfully."
        : "URL created successfully.",
      url: newUrl,
      redirect_url: `${process.env.APP_URL}${newUrl.short_url}`,
    });
  }),
};

export default urlShortenerController;