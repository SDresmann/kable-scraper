const express = require('express');
const scrapeKableAcademyDates = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/events', async (req, res) => {
    try {
        const dates = await scrapeKableAcademyDates();
        res.json(dates);
    } catch (error) {
        console.error('Error fetching dates:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
