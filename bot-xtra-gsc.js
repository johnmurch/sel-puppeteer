/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const neatCsv = require("neat-csv");
const os = require("os");
const puppeteer = require("puppeteer");

// UPDATE THIS TO YOUR DOMAIN!!!!
const FIND_DOMAIN = "johnmurch.com";

const PUPPETEER_OPTIONS = {
  headless: true,
  ignoreHTTPSErrors: true,
  slowMo: 25,
  args: ["--no-sandbox"],
};

// Write to CSV
const filename = path.join(__dirname, "./report/gsc-backlinks.csv");
let output = []; // holds all rows of data
const csvHeaders = [
  ["Status Code", "URL", "Backlink", "Anchor", "Rel", "Exists"],
];
output.push(csvHeaders.join());
fs.writeFileSync(filename, output); // clear file!
fs.appendFileSync(filename, '\n'); // New Line
output = [];

async function fetch(que) {
  try {
    const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
    // block resources that are not needed as just looking up backlink!
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

        // init response
        let payload = {
          statusCode: response.status(),
          url: q.url,
          backlink: "",
          anchor: "",
          rel: "",
          exists: false,
        };

        // gather all links and attributes
        const hrefs = await page.$$eval("a", (as) =>
          as.map((a) => {
            return {
              href: a.href,
              text: a.text,
              rel: a.rel,
            };
          })
        );

        // loop all links
        let notFound = true;
        hrefs.forEach((h) => {
          if (h.href.includes(FIND_DOMAIN)) {
            // Link FOUND!
            console.log(`FOUND: ${q.url}`);
            console.log(JSON.stringify(h));
            payload.backlink = h.href;
            payload.anchor = h.text;
            payload.rel = h.rel;
            payload.exists = true;
            notFound = false;
          }
        });

        if (notFound) {
          console.log(`NOT FOUND: ${q.url}`);
        }

        // generate CSV
        const row = [];
        row.push(payload.statusCode);
        row.push(payload.url);
        row.push(payload.backlink);
        row.push(payload.anchor);
        row.push(payload.rel);
        row.push(payload.exists);
        output.push(row.join());
        fs.appendFileSync(filename, output.join(os.EOL));
        fs.appendFileSync(filename, '\n'); // New Line
        output = [];
      } catch (err) {
        console.log(`Error going to URL: ${err}`);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
}

const getQue = async () => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      "./data/http___www.johnmurch.com_-Latest links-2020-07-15.csv"
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
getQue()
  .then((fetchedQue) => {
    // console.log("fetchedQue", fetchedQue);
    return fetchedQue.map((u) => {
      return {
        url: u["Linking page"], // default header from Google Search Console
      };
    });
  })
  .then((que) => {
    // console.log("que", que);
    if (que.length == 0) {
      process.exit(0);
    }
    fetch(que);
  });