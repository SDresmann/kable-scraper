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

        // Adjust the selector below to match the website's HTML structure
        const dates = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.date-class')) // Replace '.date-class' with the actual selector
                .map(el => el.textContent.trim());
        });

        await browser.close();
        return dates;
    } catch (error) {
        console.error('Error scraping the website:', error);
        return [];
    }
}
