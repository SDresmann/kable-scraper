const puppeteer = require('puppeteer');

export default async (req, res) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://kableacademy.com/', { waitUntil: 'networkidle2' });

    const dates = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.date-class')) // Adjust selector
            .map(el => el.textContent.trim());
    });

    await browser.close();
    res.status(200).json(dates);
};
