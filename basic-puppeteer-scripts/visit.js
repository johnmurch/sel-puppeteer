const puppeteer = require('puppeteer');
// setup default options:
const PUPPETEER_OPTIONS = {
  headless: false,
  ignoreHTTPSErrors: true,
  slowMo: 250,
  args: ["--no-sandbox"],
};

(async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS); // launch browser
  const page = await browser.newPage(); // create page
  // setup default viewport
  await page.setViewport({
    width: 1280,
    height: 800
  }); // default viewport
  await page.goto('https://www.amazon.com'); // visit website

  await browser.close(); // closer browser
})();