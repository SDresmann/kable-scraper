import express from 'express';
import { scrapeKableAcademyDates } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 10000;

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Kable Academy Scraper API. Use /api/dates to get the latest dates.');
});

// API route for dates
import axios from 'axios';



app.get('/api/dates', async (req, res) => {
    try {
        const dates = await scrapeKableAcademyDates();
        if (!dates || dates.length === 0) {
            return res.status(404).json({ error: 'No dates found.' });
        }
        res.json(dates);
    } catch (error) {
        console.error('Error fetching dates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/test-site', async (req, res) => {
    try {
        const response = await axios.get('https://kableacademy.com/');
        console.log('HTML content:', response.data); // Log for debugging
        res.send('Site is accessible.');
    } catch (error) {
        console.error('Error accessing site:', error);
        res.status(500).send('Cannot access the site.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
