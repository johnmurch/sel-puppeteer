const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // setup default options
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  );

  await page.goto('https://www.reddit.com/');
  await page.waitForSelector('title');

  // Takes a screenshot of the whole viewport
  await page.screenshot({
    path: 'ss/screenshot-top.png'
  });

  await page.screenshot({
    path: 'ss/screenshot-clip.jpg',
    type: 'jpeg',
    quality: 90,
    clip: {
      x: 450,
      y: 0,
      width: 500,
      height: 600
    }
  });

  await page.screenshot({
    path: 'ss/screenshot-full.png',
    fullPage: true
  });
  await browser.close();
})();