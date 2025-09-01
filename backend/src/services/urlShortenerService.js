import urlShortenerModel from "../models/urlShortenerModel.js";
import { generateNanoId } from "../utils/helper.js";
import createUrlShortenerDAO  from "../doa/urlShortenerDOA.js";
/**
 * Generate a unique short code (handling collisions)
 */
const generateUniqueShortCode = async () => {
  try {
    let shortUrl = generateNanoId(6);
    let existingUrl = await urlShortenerModel.findOne({ short_url: shortUrl });
  
    // Keep generating until a unique one is found
    while (existingUrl) {
      shortUrl = generateNanoId(6);
      existingUrl = await urlShortenerModel.findOne({ short_url: shortUrl });
    }
    return shortUrl;
  } catch (error) {
    
    console.error("Error generating unique short code:", error);
    throw new Error("Failed to generate unique short code, generateUniqueShortCode");
  }
};

/**
 * Service: Create Short URL WITH userId
 */
export async function createUrlShortenerService(url, userId) {
  try {
    const shortUrl = await generateUniqueShortCode();
    const newUrl = await createUrlShortenerDAO(url, shortUrl, userId);
    return newUrl;
  } catch (error) {
    console.error("shortening URL (with user):", error);
    throw new Error("Failed to shorten URL with user, createUrlShortenerService");
  }
}

