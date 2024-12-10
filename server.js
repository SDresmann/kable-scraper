import express from 'express';
import { scrapeKableAcademyDates } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Kable Academy Scraper API. Use /api/dates to get the latest dates.');
});

// API route for dates
app.get('/api/dates', async (req, res) => {
    try {
        const dates = await scrapeKableAcademyDates();

        if (!dates || dates.length === 0) {
            console.warn('No dates found, returning fallback response.');
            return res.status(404).json({ error: 'No dates found.' });
        }

        res.json(dates);
    } catch (error) {
        console.error('Error fetching dates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
