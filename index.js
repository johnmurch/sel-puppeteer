// When You hit that peak!
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: false // Watch your code
  }); // launch browser
  const page = await browser.newPage(); // create page
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  );
  await page.setViewport({
    width: 1200,
    height: 3000,
  });
  await page.goto('https://xkcd.com/323/'); // visit website
  await page.waitFor(3000);
  await browser.close(); // closer browser
})();