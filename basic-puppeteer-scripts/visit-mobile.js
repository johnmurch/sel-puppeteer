const puppeteer = require('puppeteer');
// setup default options:
const PUPPETEER_OPTIONS = {
  headless: false, // allows you to watch!
  ignoreHTTPSErrors: true,
  defaultViewport: {
    width: 375,
    height: 667,
    isMobile: true,
  },
  args: ["--no-sandbox"],
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1'
};

(async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS); // launch browser
  const page = await browser.newPage(); // create page
  await page.goto('https://www.amazon.com'); // visit website

  await page.waitFor(3000);

  await browser.close(); // closer browser
})();