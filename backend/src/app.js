
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import urlShortenerRoute from "./routes/urlShortenerRoute.js";
import urlRedirectionRoute from "./routes/urlRedirectionRoute.js";
import authRoute from "./routes/authRoute.js";
import { errorHandler } from "./errors/errorHandler.js";
import cookieParser from "cookie-parser";
import attachUser from "./utils/attachUser.js";

const app = express();

// Middleware
app.use(cookieParser()); 
app.use(cors({
  origin: 'http://localhost:5173', // your React app
  credentials: true // 👈 this allows cookies to be sent
}));
app.use(express.json());
app.use(attachUser)



//body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", urlRedirectionRoute);
app.use("/api/create", urlShortenerRoute);
app.use("/api/auth", authRoute);





// Error handler should be the last middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
