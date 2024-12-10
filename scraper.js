import { chromium } from 'playwright';

export async function scrapeKableAcademyDates() {
    const url = 'https://kableacademy.com/';

    try {
        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        console.log('Navigating to the site...');
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });

        // Log the full HTML content of the page for debugging
        const content = await page.content();
        console.log('Page content:', content);

        console.log('Waiting for selector...');
        await page.waitForSelector('.elementor-testimonial__text', { timeout: 15000 });

        console.log('Scraping data...');
        const dates = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.elementor-testimonial__text'))
                .map(el => el.textContent.trim())
        );

        console.log('Scraped Dates:', dates);
        await browser.close();

        if (!dates || dates.length === 0) {
            console.error('No dates were scraped. Possible selector or rendering issue.');
            throw new Error('No dates found.');
        }

        return dates;
    } catch (error) {
        console.error('Error in scrapeKableAcademyDates:', error);
        return [];
    }
}
