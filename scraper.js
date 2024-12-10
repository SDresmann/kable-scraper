const puppeteer = require('puppeteer');

async function scrapeKableAcademyDates() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://kableacademy.com/', { waitUntil: 'networkidle2' });

    // Adjust the selector to match the actual HTML element containing the dates
    const dates = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.date-class')) // Replace '.date-class' with the actual class or selector
            .map(el => el.textContent.trim());
    });

    await browser.close();
    return dates;
}

// Test the scraper
scrapeKableAcademyDates().then(dates => console.log(dates));
