const puppeteer = require('puppeteer');

async function scrapeKableAcademyDates() {
    const url = 'https://kableacademy.com/';

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ]
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Replace '.date-class' with the actual selector for dates
        const dates = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.date-class')) // Update selector
                .map(el => el.textContent.trim());
        });

        await browser.close();
        return dates;
    } catch (error) {
        console.error('Error scraping the website:', error);
        return [];
    }
}

module.exports = scrapeKableAcademyDates;
