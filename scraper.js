import { chromium } from 'playwright';

export async function scrapeKableAcademyDates() {
    const url = 'https://kableacademy.com/';

    try {
        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'load', timeout: 30000 }); // 30-second timeout

        // Wait for the target elements with a timeout
        await page.waitForSelector('.elementor-testimonial__text', { timeout: 10000 }); // 10-second timeout

        // Scrape the dates
        const dates = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.elementor-testimonial__text'))
                .map(el => el.textContent.trim());
        });

        console.log('Scraped Dates:', dates); // Log for debugging
        await browser.close();

        if (!dates || dates.length === 0) {
            console.error('No dates were scraped.');
            throw new Error('No dates found.');
        }

        return dates;
    } catch (error) {
        console.error('Error in scrapeKableAcademyDates:', error);
        return []; // Return an empty array if something goes wrong
    }
}
