import express from 'express';
import { scrapeKableAcademyDates } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to set CSP headers
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:;");
    next();
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Kable Academy Scraper API. Use /api/events to get data.');
});

// API route
app.get('/api/events', async (req, res) => {
    try {
        const dates = await scrapeKableAcademyDates();

        if (!dates || dates.length === 0) {
            return res.status(404).json({ error: 'No events found' });
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
