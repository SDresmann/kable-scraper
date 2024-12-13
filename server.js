import express from "express";
import { main } from "./kable.js"; // Import the main function from kable.js

const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Kable Academy Scraper API!");
});

// API route to run the scraper
app.get("/api/data", async (req, res) => {
    try {
        const data = await main(); // Call the main function
        res.json(data); // Send the scraped data as JSON
    } catch (error) {
        console.error("Error while scraping data:", error);
        res.status(500).json({ error: "Failed to scrape data." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
