/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const neatCsv = require("neat-csv");
const os = require("os");
const puppeteer = require("puppeteer");

const PUPPETEER_OPTIONS = {
  headless: false,
  ignoreHTTPSErrors: true,
  args: ["--no-sandbox","--disable-notifications"],
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
  defaultViewport: {
    width: 1200,
    height: 720,

  }
};

async function fetch(que) {
  try {
    const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
    const page = await browser.newPage();

    // catch errors!
    process.on("unhandledRejection", (reason, p) => {
      console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
      browser.close();
    });

    // loop and process que
    for await (q of que) {
      try {
        let response = await page.goto(q.url, {
          waitUntil: "networkidle0",
          timeout: 60000,
        });

        // statusCode, url, title
        let title = await page.title();
        let payload = {
          statusCode: response.status(),
          url: q.url,
          title: title
        };
        console.log(payload)

      } catch (err) {
        console.log(`Error going to URL: ${err}`);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
}

const getRandomSites = async () => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      "./data/demo.csv"
    );
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject("error reading file");
      }
      resolve(neatCsv(data)); // be sure to npm install neat-csv
    });
  });
};

// RUN
getRandomSites()
  .then((fetchedQue) => {
    // console.log("fetchedQue", fetchedQue);
    return fetchedQue.map((u) => {
      return {
        url: u.url
      };
    });
  })
  .then((que) => {
    console.log("que", que);
    if (que.length == 0) {
      process.exit(0);
    }
    fetch(que);
  });