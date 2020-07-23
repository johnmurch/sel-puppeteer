const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');

// CHANGE DEFAULT URL
const url = 'https://www.tesla.com';
const filename = 'tesla.csv';

(async () => {
  const browser = await puppeteer.launch(); // launch browser
  const page = await browser.newPage(); // create page
  await page.goto(url); // visit website
  const title = await page.title(); // page Title
  const description = await page.$eval('meta[name="description"]',
    el => el.content); // Meta Description

  // results: url, title, description
  let result = {
    url: url,
    title: title,
    description: description
  };
  console.log(result);

  await browser.close(); // closer browser
})();