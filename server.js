const express = require('express');
const scrapeKableAcademyEvents = require('./scraper');

const app = express();
const PORT = 3000;

// API Endpoint to Fetch Events
app.get('/api/events', async (req, res) => {
    const events = await scrapeKableAcademyEvents();
    res.json(events);
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
