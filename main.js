// Run before running node main.js
// /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

const puppeteer = require('puppeteer');
// Get URL from command line argument
// const notionUrl = process.argv[2];
// 
// // Validate URL
// if (!notionUrl) {
//   console.error('Please provide a Notion URL as an argument');
//   console.log('Usage: node main.js <notion-url>');
//   process.exit(1);
// }
// const imagePath = process.argv[3];
// if (!imagePath) {
//     console.error('Please provide an image path');
//     console.log('Usage: node main.js <notion-url> <image-path>');
//     process.exit(1);
// }
async function upload_image_notion(notionUrl, imagePath) {
    // profie Profile Path	/Users/darcy/Library/Application Support/Google/Chrome/Profile 5
    const CHROME_PROFILE_PATH = '/Users/darcy/Library/Application Support/Google/Chrome/Profile 5';
    try {
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222',
      defaultViewport: null,
      args: [
        `--user-data-dir=${CHROME_PROFILE_PATH}`,
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const pages = await browser.pages();
    let page = pages[1]//await browser.newPage();
    await page.goto(notionUrl);
    console.log('Successfully navigated to Notion');
    // click the button with the text change cover
    // click the button with the text change cover
    // Position mouse over cover image

    const with_cv_imag_selector = '#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > main > div > div > div.whenContentEditable > div > div.layout-full > div > div > div:nth-child(2) > div > div:nth-child(1)';
    //const no_icon_img_selector = '#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > main > div > div > div.whenContentEditable > div > div:nth-child(3) > div > div > div.pseudoSelection > div:nth-child(2) > div > div:nth-child(1)';
    //const no_cv_img_selector = '#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > main > div > div > div.whenContentEditable > div > div:nth-child(3) > div > div > div.pseudoSelection > div:nth-child(2) > div > div:nth-child(1)';
   //
//
    //try {
    //    await page.waitForSelector(no_icon_img_selector);
    //    await page.click(no_icon_img_selector);
    //    console.log('Successfully clicked element no_icon_img_selector');
    //    await page.waitForSelector(no_cv_img_selector);
    //    await page.click(no_cv_img_selector);
    //    console.log('Successfully clicked element no_icon_img_selector');
    //} catch (error) {
    //    console.error('Failed to click element:',selector, error);
    //}
    
    selector = with_cv_imag_selector
    await page.waitForSelector(selector);
    await page.click(selector);
    console.log('Successfully clicked element');
   
     // upload link #notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div
     const upload_link_selector = "#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div"
     await page.waitForSelector(upload_link_selector);
     await page.click(upload_link_selector);
    // Don't close the browser, just disconnect

    const uploadButtonSelector = '#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div.notion-scroller.vertical > div:nth-child(2) > div > div > div:nth-child(1) > div';

    await page.waitForSelector(uploadButtonSelector);
    // Handle file upload
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click(uploadButtonSelector)
    ]);
    await fileChooser.accept([imagePath]);

    // Wait for upload to complete (adjust timeout as needed)
    // await page.waitForSelector('.notion-image-block', { timeout: 10000 });
    console.log('File uploaded successfully');
    // close the tab
    // Wait for upload completion and image to be visible
    // Additional wait to ensure image is fully loaded
    
    
    console.log('Number of pages:', pages.length);
    // page.close();
    // await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
//

//Pages
//https://www.notion.so/darcy-liu/68b0bec7-f4f2-4a21-9e05-f4fce9dca4b2-68b0bec7f4f24a219e05f4fce9dca4b2 

//image must be 	https://www.notion.so/images/page-cover/solid_blue.png
// cover set by the api wiht
upload_image_notion('https://www.notion.so/darcy-liu/image6-4aca6700377847518646815b8e87825a','/Users/darcy/repos/puppeter-upload-image-icon-notion/image/IMG_2930.jpeg').catch(console.error);
const imagePaths = [
    '/Users/darcy/repos/puppeter-upload-image-icon-notion/image/IMG_2927.jpeg',
    '/Users/darcy/repos/puppeter-upload-image-icon-notion/image/IMG_2930.jpeg',
    '/Users/darcy/repos/puppeter-upload-image-icon-notion/image/IMG_2935.jpeg',
    '/Users/darcy/repos/puppeter-upload-image-icon-notion/image/IMG_2940.jpeg'
];

const notionUrls = [
    'https://www.notion.so/darcy-liu/Image1-b484c8a35a294729986e16508b843694',
    'https://www.notion.so/darcy-liu/image2-fb66917807434ffe95cff49de1b9ee7f',
    'https://www.notion.so/darcy-liu/image3-f74579226d86447d9d2c663fcccf52b4',
    'https://www.notion.so/darcy-liu/image4-32b2167857b34b4bbb65c047993bb509'
];

async function uploadConcurrent() {
    try {
        const uploadTasks = imagePaths.map((imagePath, index) => 
            upload_image_notion(notionUrls[index], imagePath)
        );
        await Promise.all(uploadTasks);
        console.log('All uploads completed successfully');
    } catch (error) {
        console.error('Error during concurrent uploads:', error);
    }
}

// uploadConcurrent().catch(console.error);