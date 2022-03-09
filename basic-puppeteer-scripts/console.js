const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch(); // launch browser
  const page = await browser.newPage(); // create page

  page.on('console', (msg) => console.log('#CONSOLE#', msg._text));
  await page.goto('https://www.cnn.com', {
    waitUntil: 'networkidle2'
  }); // visit website

  await browser.close(); // closer browser
})();