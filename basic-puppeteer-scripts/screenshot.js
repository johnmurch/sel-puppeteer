const puppeteer = require('puppeteer');

const PUPPETEER_OPTIONS = {
  headless: true,
  ignoreHTTPSErrors: true,
  args: ["--no-sandbox"],
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
  defaultViewport: {
    width: 1200,
    height: 720,
    isMobile: false,
  }
};


(async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
  const page = await browser.newPage();

  // open reddit
  await page.goto('https://www.weather.com/', { waitUntil: 'networkidle2'});
	// await page.waitForSelector('body');

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