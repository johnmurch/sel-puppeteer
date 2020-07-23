const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch(); // launch browser
  const page = await browser.newPage(); // create page
  await page.goto('https://www.tesla.com'); // visit website

  // Insert Awesome Code Here

  await browser.close(); // closer browser
})();