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
