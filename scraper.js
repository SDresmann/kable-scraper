const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeKableAcademyEvents() {
    const url = 'https://kableacademy.com/events'; // Replace with your events page URL
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const events = [];

        $('.event-card').each((i, element) => { // Adjust CSS selectors as needed
            const title = $(element).find('.event-title').text().trim();
            const date = $(element).find('.event-date').text().trim();
            const location = $(element).find('.event-location').text().trim();
            events.push({ title, date, location });
        });

        return events;
    } catch (error) {
        console.error('Error scraping the website:', error);
        return [];
    }
}

module.exports = scrapeKableAcademyEvents;
