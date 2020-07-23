const fs = require('fs');
const puppeteer = require('puppeteer');

// UPDATE THIS URL!!!!!
const url = 'https://www.youtube.com';

(async () => {
  const browser = await puppeteer.launch(); // launch browser
  const page = await browser.newPage(); // create page
  let response = await page.goto(url)

  const dom = await page.content();
  const source = await response.text();
  // console.log('dom', dom)
  // console.log('------------------')
  // console.log('source', source)

  // save files
  fs.writeFileSync('../report/dom.html', dom);
  fs.writeFileSync('../report/source.html', source);

  await browser.close(); // closer browser
})();