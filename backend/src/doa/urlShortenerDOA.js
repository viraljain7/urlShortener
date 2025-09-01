import urlShortenerModel from "../models/urlShortenerModel.js";

export default async function createUrlShortenerDOA (url, shortUrl, userId = null) {
  try {
    // If userId is provided, include it in the new URL document
    //  Create a new URL document
    const newUrl = new urlShortenerModel({
      full_url: url,
      short_url: shortUrl,
    });
    
    if(userId){
      newUrl.user_id = userId;
    } 
  
  
    // Save the new URL to the database
    await newUrl.save();
    return newUrl;
  } catch (error) {
    throw new Error("Failed to create short URL, createUrlShortenerDOA");
  }
};
