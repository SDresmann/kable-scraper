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
        await page.waitForSelector('.elementor-testimonial__text'); // Wait for the specific class

        // Scrape the testimonials
        const testimonials = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.elementor-testimonial__text'))
                .map(el => el.textContent.trim());
        });

        console.log('Scraped Testimonials:', testimonials); // Log for debugging
        await browser.close();

        if (!testimonials || testimonials.length === 0) {
            throw new Error('No testimonials were scraped. Check your selector.');
        }

        return testimonials;
    } catch (error) {
        console.error('Error in scrapeKableAcademyTestimonials:', error);
        return [];
    }
}
