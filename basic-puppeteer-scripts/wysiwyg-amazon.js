// load puppeteer
const puppeteer = require('puppeteer');
const PUPPETEER_OPTIONS = {
  headless: false, // allows you to watch!
  ignoreHTTPSErrors: true,
  defaultViewport: {
    width: 1080,
    height: 1000,
    isMobile: false,
  },
  slowmo: 250,
  args: ["--no-sandbox"],
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1'
};

(async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS); // launch browser
  const page = await browser.newPage(); // create page
  await page.goto('https://www.amazon.com', {
    timeout: 30000
  }); // visit website

  // search and wait the product list
  await page.type('#twotabsearchtextbox', '4tb external hard drive');
  await page.waitFor(1000);
  await page.click('input.nav-input');
  await page.waitForSelector('.s-image');

  // create a screenshots of result page
  await page.screenshot({
    path: 'ss/amazon.png',
    fullPage: true
  });

  // page.$ = document.querySelect
  // page.$$ = document.querySelectAll
  const getFirstProduct = await page.$('a.a-link-normal.a-text-normal');
  let href = await (await getFirstProduct.getProperty('href')).jsonValue() || "";
  let title = await (await getFirstProduct.getProperty('textContent')).jsonValue() || "";

  let product = {
    href: href,
    title: title.trim()
  };
  console.log(product);

  // close the browser
  await browser.close();

})();