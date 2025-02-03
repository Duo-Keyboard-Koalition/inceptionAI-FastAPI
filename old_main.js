const puppeteer = require('puppeteer');

async function main() {
  try {
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222',
      defaultViewport: null
    });

    const page = await browser.newPage();
    await page.goto('https://www.notion.so/darcy-liu/portfolio-backend-42ba51e735c6425282891f116d7c2e3f');
    console.log('Successfully navigated to Notion');
    // click the selector #notion-app > div > div:nth-child(1) > div > div:nth-child(2) > main > div > div > div.whenContentEditable > div > div.layout-full > div > div > div:nth-child(2) > div > div:nth-child(1)
    const changeCoverSelector = '#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > main > div > div > div.whenContentEditable > div > div.layout-full > div > div > div:nth-child(2) > div > div:nth-child(1)';
    await page.waitForSelector(changeCoverSelector);
    // Perform your desired actions here

    // Don't close the browser, just disconnect
    await browser.disconnect();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main().catch(console.error);
