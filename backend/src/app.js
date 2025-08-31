
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import urlShortenerModel from "./models/urlShortenerModel.js";
import urlShortenerRoute from "./routes/urlShortenerRoute.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/create", urlShortenerRoute);



// Routes
app.get("/:id", async(req, res) => {
    const { id } = req.params;
    const url=await urlShortenerModel.findOne({ short_url: id });

    if (url) {
        res.redirect(url.full_url);
        // await url.incrementClicks(); // Increment clicks
    } else {
        return res.status(404).json({ error: "URL not found" });
    }

  });

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
