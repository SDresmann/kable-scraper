import { chromium } from 'playwright';

export async function scrapeKableAcademyDates() {
    const url = 'https://kableacademy.com/';

    try {
        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'load' });

        // Wait for Elementor content to load
        await page.waitForSelector('.elementor-testimonial__text');

        // Scrape the dates
        const dates = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.elementor-testimonial__text'))
                .map(el => el.textContent.trim());
        });

        console.log('Scraped Dates:', dates); // Log for debugging
        await browser.close();

        if (!dates || dates.length === 0) {
            throw new Error('No dates were scraped. Check your selector.');
        }

        return dates;
    } catch (error) {
        console.error('Error in scrapeKableAcademyDates:', error);
        return [];
    }
}
