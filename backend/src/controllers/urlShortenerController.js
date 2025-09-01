import { AppError } from "../errors/AppError.js";
import { createUrlShortenerService } from "../services/urlShortenerService.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

const urlShortenerController = {
  createUrl: tryCatchWrapper(async (req, res, next) => {
    const { url } = req.body;

    if (!url) {
      return next(new AppError("URL is required", 400));
    }

    const newUrl = await createUrlShortenerService(url);

    res.status(201).json({
      status: "true",
      message: "URL created successfully.",
      url: newUrl,
      redirect_url: `${process.env.APP_URL}${newUrl.short_url}`,
    });
  }),
};

export default urlShortenerController;
