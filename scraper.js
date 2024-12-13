import puppeteer from "puppeteer";

const scrapeKableAcademyData = async () => {
    const url = 'https://www.kableacademy.com/';

    try {
        const browser = await puppeteer.launch({
            headless: true, // Set to false for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract all articles
        const allArticles = await page.evaluate(() => {
            const articles = document.querySelectorAll('.swiper-wrapper');
            return Array.from(articles).map((article) => {
                // Get the title and testimonial text
                const title = article.querySelector('div')?.innerText.trim();
                const testimonialText = article.querySelector('.elementor-testimonial__text')?.innerText.trim();
                return { title, testimonialText };
            });
        });

        await browser.close();
        return allArticles; // Return scraped data
    } catch (error) {
        console.error('Error in scrapeKableAcademyData:', error);
        return []; // Return an empty array on error
    }
};

export default scrapeKableAcademyData;
