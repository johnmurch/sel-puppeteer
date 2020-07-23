/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const neatCsv = require("neat-csv");
const os = require("os");
const puppeteer = require("puppeteer");

const PUPPETEER_OPTIONS = {
  headless: true,
  ignoreHTTPSErrors: true,
  slowMo: 25,
  args: ["--no-sandbox"],
};

// Write to CSV
const filename = path.join(__dirname, "./report/redirects.csv");
fs.writeFileSync(filename, ""); // clear file!
let output = []; // holds all rows of data
const csvHeaders = [
  ["Status Code", "Destination URL", "Redirect Count", "Redirect Status Code", "Redirect"],
];
output.push(csvHeaders.join('\n'));
fs.writeFileSync(filename, output.join(os.EOL));
fs.appendFileSync(filename, '\n');
output = [];

async function fetch(que) {
  try {
    const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
    // block resources that are not needed as just looking up redirects!
    const blockedResources = [
      "image",
      "stylesheet",
      "media",
      "font",
      "texttrack",
      "object",
      "beacon",
      "csp_report",
      "imageset",
    ];
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    );
    await page.setViewport({
      width: 1200,
      height: 720,
    });

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (blockedResources.includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // catch errors!
    process.on("unhandledRejection", (reason, p) => {
      console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
      browser.close();
    });

    // loop and process que
    for await (q of que) {
      try {
        let redirectChain = [];

        let response = await page.goto(q.url, {
          waitUntil: "networkidle0",
          timeout: 60000,
        });

        const chain = response.request().redirectChain();
        if (chain.length > 0) {
          chain.forEach((c) => {
            redirectChain.push({
              status: c._response._status,
              url: c.url(),
              headers: c._response._headers
            })
          })
        }

        // init response
        let payload = {
          statusCode: response.status(),
          url: response.url(),
          redirectChain: redirectChain,
          redirectChainLength: redirectChain.length
        };
        console.log(JSON.stringify(payload, null, 4))

        // generate CSV
        let firstRun = true;
        if (payload.redirectChain.length > 0) {
          payload.redirectChain.forEach((d) => {
            const row = []; // a new array for each row of data
            if (firstRun) {
              row.push(payload.statusCode)
              row.push(payload.url)
              row.push(payload.redirectChainLength)
              firstRun = false;
            } else {
              row.push('')
              row.push('')
              row.push('')
            }
            row.push(d.status);
            row.push(d.url);
            output.push(row.join()); // by default, join() uses a ','
            fs.appendFileSync(filename, output.join(os.EOL));
            fs.appendFileSync(filename, '\n');
            output = [];
          });
        } else {
          const row = [];
          row.push(payload.statusCode)
          row.push(payload.url)
          row.push(payload.redirectChainLength)
          row.push('')
          row.push('')
          output.push(row.join()); // by default, join() uses a ','
          fs.appendFileSync(filename, output.join(os.EOL));
        }
      } catch (err) {
        console.log(`Error going to URL: ${err}`);
      }
    }
    fs.appendFileSync(filename, output.join(os.EOL));
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
}

const getRedirects = async () => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      "./data/redirects.csv"
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
getRedirects()
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