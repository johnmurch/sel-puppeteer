<!-- PROJECT -->
<br />
<p align="center">
  <a href="https://github.com/johnmurch/sel-puppeteer">
    <img src="logo.png" alt="Live with Search Engine Land: Scripting and Scraping with Headless Chrome" >
  </a>

  <h3 align="center">Search Engine Land: Scripting and Scraping with Headless Chrome</h3>

</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You will need to have [node and npm](https://nodejs.org/en/download/) setup and installed on your machine

### Installation

1. Clone the sel-puppeteer

```sh
git clone https://github.com/johnmurch/sel-puppeteer.git
```

2. Install NPM packages

```sh
npm install
```

3. There is no step 3 :) should be good to go!

<!-- USAGE EXAMPLES -->

## Usage

These scripts were used during the presentation (or generated) to demo Puppeteer and showcase some basic use cases for SEO.

e.g.

- visit a website
- extract page source and DOM
- get Page Title and Meta Description
- view console of a website
- Take screenshots
- View as Mobile
- Keyboard Interaction

```bash
├── basic-puppeteer-scripts
│   ├── ss # dump screenshots from screenshot.js
│   │   ├── amazon.jpg
│   │   ├── screenshot-clip.jpg
│   │   ├── screenshot-full.png
│   │   ├── screenshot-top.png
│   ├── basic.js
│   ├── basic-dom-vs-source.js
│   ├── basic-title-meta.js
│   ├── console.js
│   ├── screenshot.js
│   ├── visit.js
│   ├── visit-headless.js
│   ├── visit-mobile.js
│   ├── wysiwyg-amazon.js
│   ├── cli # bash to run chrome headless
│   │   ├── dump-dom.sh
│   │   ├── generate-screenshot.sh
│   │   ├── screenshot.png
│   ├── data # data for bot-a-quick-demo.js, bot-backlinks.js, bot-xtra-gsc.js, bot-redirect.js
│   │   ├── backlinks.csv
│   │   ├── demo.csv
│   │   ├── http___www.johnmurch.com_-Latest links-2020-07-15.csv
│   │   ├── redirect.txt
│   ├── report # generated from bot-backlinks.js, bot-xtra-gsc.js, bot-redirect.js, dom-vs-source-save.js
│   │   ├── backlinks.csv
│   │   ├── dom.html
│   │   ├── gsc-backlinks.csv
│   │   ├── redirects.csv
│   │   ├── source.html
├── bot-a-quick-demo.js
├── bot-backlinks.js
├── bot-redirect.js
├── bot-xtra-gsc.js
├── index.js # 🍻
├── LICENSE
├── logo.png
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

```bash
node basic-puppeteer-scripts/console.js # example of how to run
```

### bot-backlinks.js - **data/backlinks.csv**

```bash
node bot-backlinks.js # example of how to run
```

### bot-redirect.js - **data/redirect.txt**

```bash
node bot-redirect.js # example of how to run
```

### bot-xtra-gsc.js - Contains a subset of data **data/http\*\_\_www.johnmurch.com\_-Latest links-2020-07-15.csv**

```bash
node bot-xtra-gsc.js # example of how to run
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

John Murch - [@johnmurch](https://twitter.com/johnmurch)
