
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import urlShortenerRoute from "./routes/urlShortenerRoute.js";
import urlRedirectionRoute from "./routes/urlRedirectionRoute.js";
import { errorHandler } from "./errors/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/create", urlShortenerRoute);



// Routes
app.use("/", urlRedirectionRoute);


// Error handler should be the last middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
