import puppeteer from "puppeteer";

const url = 'https://www.kableacademy.com/'

const main = async () =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const allArticles = await page.evaluate(() => {
        const articles = document.querySelectorAll('.swiper-wrapper')

        return Array.from(articles).map((article) => {
            const title = article.querySelector('div').innerHTML;
            const url = article.querySelector('elementor-testimonial__text')
            return {title, url}
        })
    })
    console.log(allArticles);
    
}

main();