import urlShortenerModel from "../models/urlShortenerModel.js";
import { generateNanoId } from "../utils/helper.js";
import createUrlShortenerDAO from "../dao/urlShortenerDAO.js";

/**
 * Generate a unique short code (handling collisions)
 */
const generateUniqueShortCode = async () => {
  let shortUrl;
  let exists = true;

  while (exists) {
    shortUrl = generateNanoId(6);
    exists = await urlShortenerModel.exists({ short_url: shortUrl });
  }

  return shortUrl;
};

/**
 * Service: Create Short URL (with optional userId & custom slug)
 */
export async function getShortUrlService(url, slug = null, userId = null) {
  if(slug) {
    const exists = await urlShortenerModel.exists({ short_url: slug });
    if (exists) {      
      throw new Error("Custom URL already exists. Please choose another one.");
    }
  }
  const shortUrl = slug || (await generateUniqueShortCode());
  return await createUrlShortenerDAO(url, shortUrl, userId);
}