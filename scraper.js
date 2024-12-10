const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeKableAcademyDates() {
    const url = 'https://kableacademy.com/';

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const dates = [];

        // Update the selector to match the actual HTML structure on the website
        $('.date-class').each((i, element) => { // Replace '.date-class' with the actual class or tag
            const date = $(element).text().trim();
            dates.push(date);
        });

        return dates;
    } catch (error) {
        console.error('Error scraping the website:', error);
        return [];
    }
}

// Test the scraper
scrapeKableAcademyDates().then(dates => console.log(dates));
