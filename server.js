import express from "express";
import { scrapeKableAcademyData } from "./kable.js"; // Import the scraper function

const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Kable Academy Scraper API!");
});

// API route to scrape data
app.get("/api/data", async (req, res) => {
    try {
        const data = await scrapeKableAcademyData(); // Call the scraper function
        res.json(data); // Return the scraped data as JSON
    } catch (error) {
        console.error("Error scraping data:", error);
        res.status(500).json({ error: "Failed to scrape data." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});