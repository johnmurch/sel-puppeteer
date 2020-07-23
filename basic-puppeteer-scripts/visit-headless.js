const puppeteer = require('puppeteer');
// setup default options:
const PUPPETEER_OPTIONS = {
  headless: false, // allows you to watch!
  ignoreHTTPSErrors: true,
  slowMo: 250,
  args: ["--no-sandbox"],
};

(async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS); // launch browser
  const page = await browser.newPage(); // create page
  await page.goto('https://www.amazon.com'); // visit website

  await page.waitFor(3000);

  await browser.close(); // closer browser
})();