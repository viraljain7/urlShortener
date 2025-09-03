import urlShortenerModel from "../models/urlShortenerModel.js";

export default async function createUrlShortenerDAO(url, shortUrl, userId = null) {
  const newUrl = new urlShortenerModel({
    full_url: url,
    short_url: shortUrl,
    ...(userId && { user: userId }), // cleaner conditional assignment
  });

  return await newUrl.save();
}