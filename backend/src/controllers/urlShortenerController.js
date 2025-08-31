import urlShortenerModel from "../models/urlShortenerModel.js";
import { generateNanoId } from "../utils/helper.js";

const urlShortenerController = {
  createUrl: async (req, res) => {
    const { url } = req.body;
    
     if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortUrl = generateNanoId(6); // Generate a 6-character short code
    const newUrl = new urlShortenerModel({
      full_url: url,
      short_url: shortUrl,
    });

    await newUrl.save();

    res.status(201).json({
      status: "true",
      message: "URL created successfully.",
      url: `${process.env.APP_URL}${newUrl.short_url}`,
    });
  },
};

export default urlShortenerController;
