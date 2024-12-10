import { chromium } from 'playwright';

export async function scrapeKableAcademyDates() {
    const url = 'https://kableacademy.com/';

    try {
        const browser = await chromium.launch({
            headless: false, // Run in non-headless mode for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        console.log('Navigating to the site...');
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Log the entire HTML content of the page for debugging
        const content = await page.content();
        console.log('Page content:', content); // Logs the full page HTML

        // Wait for the specific element (dates container)
        await page.waitForSelector('.elementor-testimonial__text', { timeout: 15000 });

        // Extract the text content of matching elements
        const dates = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.elementor-testimonial__text'))
                .map(el => el.textContent.trim())
        );

        console.log('Scraped Dates:', dates);
        await browser.close();

        if (!dates || dates.length === 0) {
            throw new Error('No dates found. Check if the selector is correct or if the content is dynamic.');
        }

        return dates;
    } catch (error) {
        console.error('Error in scrapeKableAcademyDates:', error);
        return [];
    }
}
