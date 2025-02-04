// Run before running node main.js
// /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
<<<<<<< HEAD
const CHROME_PROFILE_PATH = "/Users/darcy/Library/Application Support/Google/Chrome/Profile 5";
=======

const puppeteer = require('puppeteer');
>>>>>>> 729bc69 (able to connect to a chrome remotelly)

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Read image directory
const imageDir = "/Users/darcy/repos/puppeter-upload-image-icon-notion/image";
const imagePaths = fs.readdirSync(imageDir)
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(file => path.join(imageDir, file));

// Read existing config
const configPath = "./config.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
// Update config with image paths
const updatedConfig = {
    ...config,
    imagePaths
};

// Write back to config.json
fs.writeFileSync(
    configPath, 
    JSON.stringify(updatedConfig, null, 4)
);
// Connect to browser once
async function connectBrowser() {
  return await puppeteer.connect({
      browserURL: "http://localhost:9222",
      defaultViewport: null,
      args: [
          `--user-data-dir=${CHROME_PROFILE_PATH}`,
          "--no-sandbox",
          "--disable-setuid-sandbox"
      ]
  });
}

async function getPage(browser) {
  const pages = await browser.pages();
  return pages[1] || await browser.newPage();
}
// Updated upload function that accepts page parameter
async function upload_image_notion(page, notionUrl, imagePath) {
  try {
      await page.goto(notionUrl);
      // Wait for the page to load
      await page.waitForNavigation();
      console.log("Successfully navigated to Notion");

<<<<<<< HEAD
      const with_cv_imag_selector = "#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > main > div > div > div.whenContentEditable > div > div.layout-full > div > div > div:nth-child(2) > div > div:nth-child(1)";
      
      await page.waitForSelector(with_cv_imag_selector);
      await page.click(with_cv_imag_selector);
      
      const upload_link_selector = "#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div"
      await page.waitForSelector(upload_link_selector);
      await page.click(upload_link_selector);
      // make a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const uploadButtonSelector = "#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div.notion-scroller.vertical > div:nth-child(2) > div > div > div:nth-child(1) > div";
      
      await page.waitForSelector(uploadButtonSelector);
      const [fileChooser] = await Promise.all([
          page.waitForFileChooser(),
          page.click(uploadButtonSelector)
      ]);
      await fileChooser.accept([imagePath]);
      
      console.log("File uploaded successfully");
      await new Promise(resolve => setTimeout(resolve, 10000));
      // exit the function
      return;
=======
    const page = await browser.newPage();
    await page.goto('https://www.notion.so/darcy-liu/5a7c82f8-e553-46a2-9c57-cd2994373424-5a7c82f8e55346a29c57cd2994373424');
    console.log('Successfully navigated to Notion');
    // click the button with the text change cover
    // click the button with the text change cover
    // Position mouse over cover image


    // if there is already a cover image
    while (true){
      const selector = '#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > main > div > div > div.whenContentEditable > div > div.layout-full > div > div > div:nth-child(2) > div > div:nth-child(1)';

      try {
          await page.waitForSelector(selector);
          await page.click(selector);
          console.log('Successfully clicked element');
          break;
      } catch (error) {
          console.error('Failed to click element:', error);
          const no_cv_img_selector = '#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > main > div > div > div.whenContentEditable > div > div:nth-child(3) > div > div > div.pseudoSelection > div:nth-child(2) > div > div:nth-child(1)';

          try {
              await page.waitForSelector(no_cv_img_selector);
              await page.click(no_cv_img_selector);
              console.log('Successfully clicked element');
          } catch (error) {
              console.error('Failed to click element:', error);
              break;
          }
      }
    }
     // if there is no cover image

    // Don't close the browser, just disconnect
    await browser.disconnect();
>>>>>>> 729bc69 (able to connect to a chrome remotelly)
  } catch (error) {
      console.error("Upload error:", error);
      throw error;
  }
}



const { Client } = require("@notionhq/client");
const NOTION_PRIVATE_WRITE_TOKEN = "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"
// Initialize Notion client
const notion = new Client({
    auth: NOTION_PRIVATE_WRITE_TOKEN
});

async function fetchAllPages() {
    try {
        const pages = [];
        let cursor = undefined;
        
        while (true) {
            const { results, next_cursor } = await notion.search({
                start_cursor: cursor,
                page_size: 100,
            });
            
            const pageUrls = results
                .filter(result => result.object === "page")
                .map(page => `https://www.notion.so/${page.id.replace(/-/g, "")}`);
            
            pages.push(...pageUrls);
            
            if (!next_cursor) break;
            cursor = next_cursor;
        }

        // Read existing config
        //const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
        
    
        console.log(`Found ${pages.length} pages`);
        return pages;
    } catch (error) {
        console.error("Error fetching pages:", error);
    }
}

// Run with NOTION_API_KEY environment variable
console.log("Fetching pages...");
// fetchAllPages().then(console.log).catch(console.error);
// imagePaths
// imagePaths.forEach((imagePath, index) => {
//     console.log(`[${index}] ${imagePath}`);
// });
async function main() {
    
    
    const browser = await connectBrowser();
    // get the fetchallpages
    let notionUrls = ["https://www.notion.so/de96b94f-e0b1-4a81-b967-e680857243d2-de96b94fe0b14a81b967e680857243d2",
      "https://www.notion.so/8fcd65f6-715b-4753-ba51-810020308971-8fcd65f6715b4753ba51810020308971",
      "https://www.notion.so/cf66e8ac-06a1-4a87-803f-59e8a6a3312e-cf66e8ac06a14a87803f59e8a6a3312e",
      "https://www.notion.so/70198740-c57d-48c1-87d1-001b483a5130-70198740c57d48c187d1001b483a5130",
      "https://www.notion.so/071e97bc-ad96-40c6-8b88-8caac6aa7e90-071e97bcad9640c68b888caac6aa7e90",
      "https://www.notion.so/e405026c-5591-4923-be75-76f5f5b12e18-e405026c55914923be7576f5f5b12e18",
      "https://www.notion.so/86803c44-b3d0-4817-8840-3e2e54186907-86803c44b3d0481788403e2e54186907",
      "https://www.notion.so/14962b41-6cbc-4b83-9afa-7db656f23601-14962b416cbc4b839afa7db656f23601",
      "https://www.notion.so/1462c4fa-9cc3-4d4f-83f0-10e4597be290-1462c4fa9cc34d4f83f010e4597be290",
      "https://www.notion.so/35d2c605-acbf-402f-a021-3f7300af2780-35d2c605acbf402fa0213f7300af2780",
      "https://www.notion.so/8b3d68ea-14eb-4990-8b33-06c93f96872c-8b3d68ea14eb49908b3306c93f96872c",
      "https://www.notion.so/2612f2a2-80a5-4f39-b714-60bdcf717b0f-2612f2a280a54f39b71460bdcf717b0f",
      "https://www.notion.so/7514be59-241a-40d7-8736-cc284255fcb8-7514be59241a40d78736cc284255fcb8",
      "https://www.notion.so/be7b452f-f8dc-4dfc-bf36-85059268dfc6-be7b452ff8dc4dfcbf3685059268dfc6",
      "https://www.notion.so/bd6909cd-ea9b-4931-ae94-f1a245cc982c-bd6909cdea9b4931ae94f1a245cc982c",
      "https://www.notion.so/128d07b3-c1d5-48a5-b677-cae43034cc4e-128d07b3c1d548a5b677cae43034cc4e",
      "https://www.notion.so/3a0e59db-3832-4942-b6f2-67f83d5997b6-3a0e59db38324942b6f267f83d5997b6",
      "https://www.notion.so/8b467d80-9ce9-42d5-be27-a453e6df205b-8b467d809ce942d5be27a453e6df205b",
      "https://www.notion.so/874832e6-9e40-45fb-9c6d-2befe6513fdd-874832e69e4045fb9c6d2befe6513fdd",
      "https://www.notion.so/fc17fa90-807a-44d7-a260-377f9aa2487b-fc17fa90807a44d7a260377f9aa2487b",
      "https://www.notion.so/19858b77-30e5-4e0d-b60f-2f33ce96db12-19858b7730e54e0db60f2f33ce96db12",
      "https://www.notion.so/edc09450-6c0b-4ca1-ac26-f69524af9ffa-edc094506c0b4ca1ac26f69524af9ffa",
      "https://www.notion.so/4df096a3-8335-4c9f-81cb-bc1c8d84a962-4df096a383354c9f81cbbc1c8d84a962",
      "https://www.notion.so/2f56c48e-195c-48df-ba2e-1d68465d323c-2f56c48e195c48dfba2e1d68465d323c",
      "https://www.notion.so/b74852cb-5344-40af-a925-bdf687f30478-b74852cb534440afa925bdf687f30478",
      "https://www.notion.so/28260366-4050-4be0-b3e9-cb330cd9538c-2826036640504be0b3e9cb330cd9538c",
      "https://www.notion.so/8efbac8a-e31b-4dc4-877e-fdb30738856b-8efbac8ae31b4dc4877efdb30738856b",
      "https://www.notion.so/122be8c5-0979-4d4b-a551-7701ccd1696e-122be8c509794d4ba5517701ccd1696e",
      "https://www.notion.so/c1ae6396-1e13-43f3-a33e-56ca0250f550-c1ae63961e1343f3a33e56ca0250f550",
      "https://www.notion.so/eab78d8e-1014-4473-a91e-4de27481939f-eab78d8e10144473a91e4de27481939f",
      "https://www.notion.so/f8953ec3-7cd1-44b2-9b78-c9047f0f6205-f8953ec37cd144b29b78c9047f0f6205",
      "https://www.notion.so/d304fa62-373d-4b20-9762-579c34c29dd0-d304fa62373d4b209762579c34c29dd0",
      "https://www.notion.so/33be7308-f97c-44fa-bdde-98704131c70c-33be7308f97c44fabdde98704131c70c",
      "https://www.notion.so/45217266-996d-4550-8538-222b9c89599b-45217266996d45508538222b9c89599b",
      "https://www.notion.so/30a8669e-3b0a-4a27-88bf-8c36c1b070af-30a8669e3b0a4a2788bf8c36c1b070af",
      "https://www.notion.so/a2b5bb74-d1df-406d-8b0c-5db91aeee52c-a2b5bb74d1df406d8b0c5db91aeee52c",
      "https://www.notion.so/22bc0c44-0022-4a77-8dab-adba7b5c1f31-22bc0c4400224a778dabadba7b5c1f31",
      "https://www.notion.so/50c6bcca-2438-43ee-b607-3a732d3e648a-50c6bcca243843eeb6073a732d3e648a",
      "https://www.notion.so/5a8813e2-524d-4baf-91ac-2306c39fe811-5a8813e2524d4baf91ac2306c39fe811",
      "https://www.notion.so/a67bc4b0-88b6-41df-b5ff-4835f2f7dc5e-a67bc4b088b641dfb5ff4835f2f7dc5e",
      "https://www.notion.so/daf29731-7782-4269-b7aa-317970e482c0-daf2973177824269b7aa317970e482c0",
      "https://www.notion.so/070ed3d0-aea0-481e-9e13-ef4ca9559cd4-070ed3d0aea0481e9e13ef4ca9559cd4",
      "https://www.notion.so/e1a7debe-a5d9-4fdb-8eba-72d1279e983e-e1a7debea5d94fdb8eba72d1279e983e",
      "https://www.notion.so/884ff650-5671-42db-b1fb-e3f44fffa94a-884ff650567142dbb1fbe3f44fffa94a",
      "https://www.notion.so/d917598f-12ff-46db-89ed-513d8d3231f2-d917598f12ff46db89ed513d8d3231f2",
      "https://www.notion.so/6050de0c-2d6b-44e2-83b6-f227264598c4-6050de0c2d6b44e283b6f227264598c4",
      "https://www.notion.so/3e73aff9-5f38-4e85-981b-ed73071023eb-3e73aff95f384e85981bed73071023eb",
      "https://www.notion.so/ecedabdd-98ba-48b3-8540-a3ec1e6709b8-ecedabdd98ba48b38540a3ec1e6709b8",
      "https://www.notion.so/048f3f75-a89a-4b0d-94aa-5841ef781918-048f3f75a89a4b0d94aa5841ef781918",
      "https://www.notion.so/ff4e3f7e-9541-46b1-b894-d1b19e12185d-ff4e3f7e954146b1b894d1b19e12185d",
      "https://www.notion.so/7983baa6-dbad-4034-8917-ba0ddd44e8a0-7983baa6dbad40348917ba0ddd44e8a0",
      "https://www.notion.so/a34a71fb-409c-4375-980d-a4fd7c04675c-a34a71fb409c4375980da4fd7c04675c",
      "https://www.notion.so/66857b09-8096-491e-bfc6-9b5bc01a18bb-66857b098096491ebfc69b5bc01a18bb",
      "https://www.notion.so/40f6b057-b104-46e9-873f-39f8b3c2fa8e-40f6b057b10446e9873f39f8b3c2fa8e",
      "https://www.notion.so/9b7f8405-b1ae-4cd6-bd61-cfd7dbd04292-9b7f8405b1ae4cd6bd61cfd7dbd04292",
      "https://www.notion.so/6251748c-e18d-4a85-996d-219be0c94290-6251748ce18d4a85996d219be0c94290",
      "https://www.notion.so/a3e17fac-e515-497c-b269-555bd784d7f0-a3e17face515497cb269555bd784d7f0",
      "https://www.notion.so/67fce6fb-02b6-4508-96fa-0606ba96698c-67fce6fb02b6450896fa0606ba96698c",
      "https://www.notion.so/009b5277-fef7-41d6-bfd4-5bc63320e8b3-009b5277fef741d6bfd45bc63320e8b3",
      "https://www.notion.so/60c59b67-3570-4836-96f8-0f5b2f51d8dc-60c59b673570483696f80f5b2f51d8dc",
      "https://www.notion.so/4459d8bf-ca4d-494f-8a66-29d67a637fcf-4459d8bfca4d494f8a6629d67a637fcf",
      "https://www.notion.so/df7f400c-e7da-4f8e-9428-4d1c7bc9b48e-df7f400ce7da4f8e94284d1c7bc9b48e",
      "https://www.notion.so/2e590535-fe15-4f57-8c04-f434fe206cce-2e590535fe154f578c04f434fe206cce",
      "https://www.notion.so/a4280942-27d1-4b68-b0ac-eb3df39135ad-a428094227d14b68b0aceb3df39135ad",
      "https://www.notion.so/7f88b66d-ef36-41a0-9278-80a36f0d22ea-7f88b66def3641a0927880a36f0d22ea",
      "https://www.notion.so/6c20050a-fed3-4fd4-8ff6-4c4d9a155477-6c20050afed34fd48ff64c4d9a155477",
      "https://www.notion.so/2cee4a37-4281-44e1-9a2d-e07c79c1081c-2cee4a37428144e19a2de07c79c1081c",
      "https://www.notion.so/628af4ab-5e58-45ce-9277-2554417f9c95-628af4ab5e5845ce92772554417f9c95",
      "https://www.notion.so/9e20ec99-ce05-49c8-bc25-5b8de92c82f9-9e20ec99ce0549c8bc255b8de92c82f9",
      "https://www.notion.so/6eb726c8-e9fd-43b9-ba66-8db2eeebd3e7-6eb726c8e9fd43b9ba668db2eeebd3e7",
      "https://www.notion.so/381a0151-58ad-41a1-968c-c207583bec2a-381a015158ad41a1968cc207583bec2a",
      "https://www.notion.so/ed6794ba-17a1-49ac-99ea-038d6a147f32-ed6794ba17a149ac99ea038d6a147f32",
      "https://www.notion.so/c50de177-1ea0-4844-b7df-775a80eb12b1-c50de1771ea04844b7df775a80eb12b1",
      "https://www.notion.so/cac2b8da-d1c7-498e-b4e2-2385e1dcfe9a-cac2b8dad1c7498eb4e22385e1dcfe9a",
      "https://www.notion.so/4c106570-1be5-4ed5-8d0b-732c33a2f8b4-4c1065701be54ed58d0b732c33a2f8b4",
      "https://www.notion.so/b67f5166-81ce-4341-88a6-39c508fc3a90-b67f516681ce434188a639c508fc3a90",
      "https://www.notion.so/31a6839d-4d62-4f85-a6a6-b541516288de-31a6839d4d624f85a6a6b541516288de",
      "https://www.notion.so/77d957ea-63d4-4dd8-a243-beb8d32bd6e4-77d957ea63d44dd8a243beb8d32bd6e4",
      "https://www.notion.so/b0d63144-c398-4030-bf95-c8429d6cb87f-b0d63144c3984030bf95c8429d6cb87f",
      "https://www.notion.so/2b3a797f-2d1c-4793-9360-fb068b790a8d-2b3a797f2d1c47939360fb068b790a8d",
      "https://www.notion.so/df2224ec-f5d3-4273-ad29-4fc1bda0e37b-df2224ecf5d34273ad294fc1bda0e37b",
      "https://www.notion.so/2ff96bc4-5cf5-4ebc-bd31-8e468d304ad4-2ff96bc45cf54ebcbd318e468d304ad4",
      "https://www.notion.so/ff3fc858-63f7-436c-b736-b45382e7dd46-ff3fc85863f7436cb736b45382e7dd46",
      "https://www.notion.so/e92b664d-506c-4f5f-906b-914cf799e759-e92b664d506c4f5f906b914cf799e759",
      "https://www.notion.so/6b3cbe18-114a-4ded-aa0d-baeb9839e56c-6b3cbe18114a4dedaa0dbaeb9839e56c",
      "https://www.notion.so/8d5f9d1f-640c-4a43-8a98-d49062951948-8d5f9d1f640c4a438a98d49062951948",
      "https://www.notion.so/eed02642-334f-44d7-b65d-dd04e1dff53e-eed02642334f44d7b65ddd04e1dff53e",
      "https://www.notion.so/1853f7d5-aea9-46b2-b17a-af6343ba8aa0-1853f7d5aea946b2b17aaf6343ba8aa0",
      "https://www.notion.so/b30c232d-0ec2-431e-a582-74b6a5047685-b30c232d0ec2431ea58274b6a5047685",
      "https://www.notion.so/3d05ffbd-5cb4-4616-a041-b911bebd2fe0-3d05ffbd5cb44616a041b911bebd2fe0",
      "https://www.notion.so/a98e28af-e065-4c67-81ed-156232423b16-a98e28afe0654c6781ed156232423b16",
      "https://www.notion.so/8e7820fa-7851-4ee8-976c-93bcf618fda1-8e7820fa78514ee8976c93bcf618fda1",
      "https://www.notion.so/7f3a1462-4a8c-423f-9121-7fab79afb2ba-7f3a14624a8c423f91217fab79afb2ba",
      "https://www.notion.so/0e1f0d81-9f0b-4e4f-b7dd-57ace625d905-0e1f0d819f0b4e4fb7dd57ace625d905",
      "https://www.notion.so/5fc9f0ac-1abb-4cee-8335-18a6377d4923-5fc9f0ac1abb4cee833518a6377d4923",
      "https://www.notion.so/59d2eeb6-b704-434b-a4b1-2bf82fcf7b03-59d2eeb6b704434ba4b12bf82fcf7b03",
      "https://www.notion.so/b2ae7761-3e58-4cc5-8bbc-8aac74d558cb-b2ae77613e584cc58bbc8aac74d558cb",
      "https://www.notion.so/a7e55ede-9ce3-40b0-b090-9ec04735053d-a7e55ede9ce340b0b0909ec04735053d",
      "https://www.notion.so/8b03a2a1-7952-42ca-be53-d31563919386-8b03a2a1795242cabe53d31563919386",
      "https://www.notion.so/88a7bf7e-300a-453e-b115-c1a01ee447bb-88a7bf7e300a453eb115c1a01ee447bb",
      "https://www.notion.so/7ef9bf43-29d9-426a-bcd4-15f2671c5891-7ef9bf4329d9426abcd415f2671c5891",
      "https://www.notion.so/98694fa0-d23a-45d7-91c4-8882d07eada9-98694fa0d23a45d791c48882d07eada9",
      "https://www.notion.so/51d9f932-cd07-4813-969d-0111ef1ba07a-51d9f932cd074813969d0111ef1ba07a",
      "https://www.notion.so/7f8d8789-ba43-4870-8b54-249f49d20efa-7f8d8789ba4348708b54249f49d20efa",
      "https://www.notion.so/80fe87e4-f98e-4ea0-a1cd-d1b5408153df-80fe87e4f98e4ea0a1cdd1b5408153df",
      "https://www.notion.so/a59e657b-41d5-43b6-b1a8-3f82a0219a86-a59e657b41d543b6b1a83f82a0219a86",
      "https://www.notion.so/93882a5d-49df-4994-859e-a4828524c504-93882a5d49df4994859ea4828524c504",
      "https://www.notion.so/1db940f6-e5c1-4847-ace1-348cfb711d34-1db940f6e5c14847ace1348cfb711d34",
      "https://www.notion.so/94cb2bf5-fbf9-494c-a902-75a1abf6c9d3-94cb2bf5fbf9494ca90275a1abf6c9d3",
      "https://www.notion.so/7514a986-6b6f-4b47-aa5d-d021d6387fe1-7514a9866b6f4b47aa5dd021d6387fe1",
      "https://www.notion.so/fa291d24-669e-4cd6-9075-3837bc4198eb-fa291d24669e4cd690753837bc4198eb",
      "https://www.notion.so/5980bba9-24ae-44f3-a62d-8a3df810fcb7-5980bba924ae44f3a62d8a3df810fcb7",
      "https://www.notion.so/4cc6a4cb-edff-4d58-bf60-24b11afcc4a7-4cc6a4cbedff4d58bf6024b11afcc4a7",
      "https://www.notion.so/b418a725-7e09-456a-b6f9-784e2373bef3-b418a7257e09456ab6f9784e2373bef3",
      "https://www.notion.so/ee02696c-0b68-4863-8216-8b2162c8bb3e-ee02696c0b68486382168b2162c8bb3e",
      "https://www.notion.so/9b1c3246-1905-463e-93b0-d1319280428f-9b1c32461905463e93b0d1319280428f",
      "https://www.notion.so/6e182dc5-2e79-4515-bb9d-862fc37aee73-6e182dc52e794515bb9d862fc37aee73",
      "https://www.notion.so/136c6b2c-92e3-4538-911e-5480e034627f-136c6b2c92e34538911e5480e034627f",
      "https://www.notion.so/b9d0ef32-c1b0-4ba8-98f0-624f8139949b-b9d0ef32c1b04ba898f0624f8139949b",
      "https://www.notion.so/88b3fce1-e0d5-4612-b260-297cd17afa01-88b3fce1e0d54612b260297cd17afa01",
      "https://www.notion.so/bf1ae226-7a5d-41d0-96aa-eeda81e6d87c-bf1ae2267a5d41d096aaeeda81e6d87c",
      "https://www.notion.so/afeb162a-2ac2-4d00-b88c-e29ab4af3b75-afeb162a2ac24d00b88ce29ab4af3b75",
      "https://www.notion.so/10f5c352-db9c-42d3-91cc-04bc799eb9d8-10f5c352db9c42d391cc04bc799eb9d8",
      "https://www.notion.so/d94fc70f-4ba5-4900-bdeb-520cfc9a8932-d94fc70f4ba54900bdeb520cfc9a8932",
      "https://www.notion.so/f240b979-16c2-4416-bb5d-e06b64459331-f240b97916c24416bb5de06b64459331",
      "https://www.notion.so/bf1d5aa6-9070-493e-8503-9a5a42a2011e-bf1d5aa69070493e85039a5a42a2011e",
      "https://www.notion.so/1a0d044a-ce53-4c41-8c50-0f1cc9435cde-1a0d044ace534c418c500f1cc9435cde",
      "https://www.notion.so/855f8a68-a712-492d-8865-c4e4b0158078-855f8a68a712492d8865c4e4b0158078",
      "https://www.notion.so/e855a775-8a03-46de-992d-15fdd453ff44-e855a7758a0346de992d15fdd453ff44",
      "https://www.notion.so/4d02ae42-5a95-4dc3-b3e1-606fa6ed5417-4d02ae425a954dc3b3e1606fa6ed5417",
      "https://www.notion.so/1090aa81-7a90-4134-b405-b21b59071dcb-1090aa817a904134b405b21b59071dcb",
      "https://www.notion.so/23040082-d8a4-48ea-b3d6-06ed7228ea37-23040082d8a448eab3d606ed7228ea37",
      "https://www.notion.so/9a578f11-d998-43bf-8b07-de631301a5c5-9a578f11d99843bf8b07de631301a5c5",
      "https://www.notion.so/b3417bcd-5550-4465-90f7-626abab06506-b3417bcd5550446590f7626abab06506",
      "https://www.notion.so/d6fd3e1f-c14f-402e-9739-4afb2a405a8e-d6fd3e1fc14f402e97394afb2a405a8e",
      "https://www.notion.so/a4aa7b26-038e-4ffe-819d-706770f7eef1-a4aa7b26038e4ffe819d706770f7eef1",
      "https://www.notion.so/dd407ee1-e067-4757-b1c1-8beaca8ace50-dd407ee1e0674757b1c18beaca8ace50",
      "https://www.notion.so/cb033c02-26be-4d97-b42a-8477c00880b8-cb033c0226be4d97b42a8477c00880b8",
      "https://www.notion.so/508f67bb-3211-4371-803d-7285ce76d3f4-508f67bb32114371803d7285ce76d3f4",
      "https://www.notion.so/b57ba116-850b-463e-af8e-5281f931bc0d-b57ba116850b463eaf8e5281f931bc0d",
      "https://www.notion.so/113ea882-14ce-46e9-aba9-d4a4792bc85a-113ea88214ce46e9aba9d4a4792bc85a",
      "https://www.notion.so/e457234c-b199-420c-a6e8-134c2fc900dc-e457234cb199420ca6e8134c2fc900dc",
      "https://www.notion.so/6909a9f3-9c0e-4ee7-8c27-ac57f90cfc0d-6909a9f39c0e4ee78c27ac57f90cfc0d",
      "https://www.notion.so/877c2410-95f3-4bf7-80cd-addcecd38201-877c241095f34bf780cdaddcecd38201",
      "https://www.notion.so/dfcd080a-d595-4a79-a771-66c7c3feb76d-dfcd080ad5954a79a77166c7c3feb76d",
      "https://www.notion.so/b3860171-bfca-4817-b3cc-b259c7397a50-b3860171bfca4817b3ccb259c7397a50",
      "https://www.notion.so/0b9442d9-ea11-4a28-813f-f7c75b950fa4-0b9442d9ea114a28813ff7c75b950fa4",
      "https://www.notion.so/9c129a4b-63c1-4d6e-b588-6146290e482b-9c129a4b63c14d6eb5886146290e482b",
      "https://www.notion.so/0296dd36-1cbb-4ee9-8ff9-44b1af251e5a-0296dd361cbb4ee98ff944b1af251e5a",
      "https://www.notion.so/29055cb2-5686-4847-b093-813de35fa90c-29055cb256864847b093813de35fa90c",
      "https://www.notion.so/23c4ae40-82f3-40eb-b0d1-12c3b50477da-23c4ae4082f340ebb0d112c3b50477da",
      "https://www.notion.so/c45261da-7b17-4f7f-a844-49a43014db00-c45261da7b174f7fa84449a43014db00",
      "https://www.notion.so/47595c03-5742-42c8-a27c-46053adb26f7-47595c03574242c8a27c46053adb26f7",
      "https://www.notion.so/89533258-ebde-44b5-9e4d-e1c0a95ff207-89533258ebde44b59e4de1c0a95ff207",
      "https://www.notion.so/4079b683-0d18-45b9-ade8-1458384a78ff-4079b6830d1845b9ade81458384a78ff",
      "https://www.notion.so/e6d026de-79f1-45bf-b87c-74f919597696-e6d026de79f145bfb87c74f919597696",
      "https://www.notion.so/76c1b798-4925-4897-a4e8-4f999c51f3f1-76c1b79849254897a4e84f999c51f3f1",
      "https://www.notion.so/682dbb9d-d137-4db6-b27e-a18ba875801d-682dbb9dd1374db6b27ea18ba875801d",
      "https://www.notion.so/37742d4f-7a37-416c-a230-46f6106e71f2-37742d4f7a37416ca23046f6106e71f2",
      "https://www.notion.so/37f86068-21de-42a9-a939-0fd3a3d0d5e5-37f8606821de42a9a9390fd3a3d0d5e5",
      "https://www.notion.so/6ba3a18f-1316-46ad-8d44-2170bf2eb4b1-6ba3a18f131646ad8d442170bf2eb4b1",
      "https://www.notion.so/6bd1f09b-58aa-4d85-94d7-b0d115439023-6bd1f09b58aa4d8594d7b0d115439023",
      "https://www.notion.so/77c10f13-068e-4194-8390-9ba0aa4d06b3-77c10f13068e419483909ba0aa4d06b3",
      "https://www.notion.so/79b43359-4003-46ad-96f2-c1434a68c838-79b43359400346ad96f2c1434a68c838",
      "https://www.notion.so/8bc3b29b-47fc-4764-84d3-30564dcf469d-8bc3b29b47fc476484d330564dcf469d",
      "https://www.notion.so/ab20cf9b-34d3-4232-981c-53f94fc723d6-ab20cf9b34d34232981c53f94fc723d6",
      "https://www.notion.so/e2d0a026-6a31-4644-96b7-fc81ed06ea56-e2d0a0266a31464496b7fc81ed06ea56",
      "https://www.notion.so/6e639e4e-bddb-43ef-9432-b3ff188b3d08-6e639e4ebddb43ef9432b3ff188b3d08",
      "https://www.notion.so/fc93342e-5f03-49ef-bbb8-4ef66902d1c1-fc93342e5f0349efbbb84ef66902d1c1",
      "https://www.notion.so/11b2662d-60ef-4124-bdd2-5be0e088a6a7-11b2662d60ef4124bdd25be0e088a6a7",
      "https://www.notion.so/17bb5c5d-64e5-4987-9f26-f3c421a18e43-17bb5c5d64e549879f26f3c421a18e43",
      "https://www.notion.so/653e4dba-ad4e-4a84-abf7-e4b6c10c397e-653e4dbaad4e4a84abf7e4b6c10c397e",
      "https://www.notion.so/a1103585-c568-4df3-ba68-f022a2b3fa28-a1103585c5684df3ba68f022a2b3fa28",
      "https://www.notion.so/a40d9e5f-525c-4a79-9afe-cf5654a26ae3-a40d9e5f525c4a799afecf5654a26ae3",
      "https://www.notion.so/d6358d12-3d93-4fff-afdf-991250697eb7-d6358d123d934fffafdf991250697eb7",
      "https://www.notion.so/539f78fa-8560-40b4-9782-f1dad53d2ce6-539f78fa856040b49782f1dad53d2ce6",
      "https://www.notion.so/6d9a6ea7-f4d9-46e4-ba05-45187e027ce7-6d9a6ea7f4d946e4ba0545187e027ce7",
      "https://www.notion.so/12293c7d-1c37-4bca-84f9-87c074bac079-12293c7d1c374bca84f987c074bac079",
      "https://www.notion.so/72122a98-0e01-4ee2-b7ae-f6260bc1aa73-72122a980e014ee2b7aef6260bc1aa73",
      "https://www.notion.so/c9ddcf06-a4be-4e27-942a-5155c3852b5d-c9ddcf06a4be4e27942a5155c3852b5d",
      "https://www.notion.so/63ac21f1-ba51-4186-ace9-d91d24cca8db-63ac21f1ba514186ace9d91d24cca8db",
      "https://www.notion.so/8cddff68-fb73-4c2b-81bb-85a86b5a20da-8cddff68fb734c2b81bb85a86b5a20da",
      "https://www.notion.so/d18b18d3-e7e4-46ce-b8d3-1c8d2ef598f2-d18b18d3e7e446ceb8d31c8d2ef598f2",
      "https://www.notion.so/e558a375-351e-47ee-a775-b64ec695cec6-e558a375351e47eea775b64ec695cec6",
      "https://www.notion.so/ecb5423a-6e17-4627-90cc-3ec13000ccda-ecb5423a6e17462790cc3ec13000ccda",
      "https://www.notion.so/483cc46a-47fd-4105-b936-fb1e79acd8bd-483cc46a47fd4105b936fb1e79acd8bd",
      "https://www.notion.so/ed702816-9a47-4bc8-b1ba-9da569b4e901-ed7028169a474bc8b1ba9da569b4e901",
      "https://www.notion.so/f15d32b6-ff7d-422d-9031-c9bbc3d18a42-f15d32b6ff7d422d9031c9bbc3d18a42",
      "https://www.notion.so/6d8b0513-a2a6-4a14-9e99-7055ed4e2054-6d8b0513a2a64a149e997055ed4e2054",
      "https://www.notion.so/d93d8346-87ba-4fe9-852f-fec925cbb53f-d93d834687ba4fe9852ffec925cbb53f",
      "https://www.notion.so/e01f7efd-0680-4d4c-bfaa-283e8bd00d22-e01f7efd06804d4cbfaa283e8bd00d22",
      "https://www.notion.so/b93c992d-ce21-420b-aada-873966466ce5-b93c992dce21420baada873966466ce5",
      "https://www.notion.so/045dd618-107a-4eea-8106-ec79fb182276-045dd618107a4eea8106ec79fb182276",
      "https://www.notion.so/0c646611-bb41-48e3-9e7f-c989ae3e111e-0c646611bb4148e39e7fc989ae3e111e",
      "https://www.notion.so/12221a5f-030d-4ff8-9422-b3bea726f59c-12221a5f030d4ff89422b3bea726f59c",
      "https://www.notion.so/257275fe-3a75-456d-8584-b1e9a8b63806-257275fe3a75456d8584b1e9a8b63806",
      "https://www.notion.so/45c3a7ce-aada-47ff-a604-49b26352e817-45c3a7ceaada47ffa60449b26352e817",
      "https://www.notion.so/4ca1111d-8da5-4ca7-bc80-614165a4bc15-4ca1111d8da54ca7bc80614165a4bc15",
      "https://www.notion.so/8805684c-5524-43e8-9ff8-e726477fdac7-8805684c552443e89ff8e726477fdac7",
      "https://www.notion.so/99e7f323-5acb-48f6-bbf1-fc43f6bb8908-99e7f3235acb48f6bbf1fc43f6bb8908",
      "https://www.notion.so/f7a371ce-08dc-48c9-b3c0-2f0248ab0cdb-f7a371ce08dc48c9b3c02f0248ab0cdb",
      "https://www.notion.so/b802342c-834f-4817-95b0-aa55dfa00d2b-b802342c834f481795b0aa55dfa00d2b",
      "https://www.notion.so/e72088c1-f599-4fd3-a119-a99e99df1ba9-e72088c1f5994fd3a119a99e99df1ba9",
      "https://www.notion.so/70111039-4c0b-475d-be8b-62fdeae03bc8-701110394c0b475dbe8b62fdeae03bc8",
      "https://www.notion.so/c4073c85-0200-47f9-990f-ee79f36adcb2-c4073c85020047f9990fee79f36adcb2",
      "https://www.notion.so/d7d68048-3b78-426d-bf7f-7f00279de527-d7d680483b78426dbf7f7f00279de527",
      "https://www.notion.so/ea8f03de-229b-4d4f-97f2-a1f9c6c172ea-ea8f03de229b4d4f97f2a1f9c6c172ea",
      "https://www.notion.so/14deddb7-9730-4feb-98dd-8b051a9bfd54-14deddb797304feb98dd8b051a9bfd54",
      "https://www.notion.so/516a59ce-b3fa-4d9a-b266-5cef4ec14f5c-516a59ceb3fa4d9ab2665cef4ec14f5c",
      "https://www.notion.so/62e9a9a5-a0de-44e3-9adc-28208012c36e-62e9a9a5a0de44e39adc28208012c36e",
      "https://www.notion.so/7b264909-a7a8-48e1-a2cc-a8c02e3f2582-7b264909a7a848e1a2cca8c02e3f2582",
      "https://www.notion.so/14975c20-a21f-41f6-9147-879c35e2911b-14975c20a21f41f69147879c35e2911b",
      "https://www.notion.so/1515ad62-6e7f-4136-8c60-6211fd28ffe1-1515ad626e7f41368c606211fd28ffe1",
      "https://www.notion.so/41c3b58c-ee53-461b-bfbe-c7e1f601b62b-41c3b58cee53461bbfbec7e1f601b62b",
      "https://www.notion.so/4345c559-2b70-44ef-86ad-84f3ce58321c-4345c5592b7044ef86ad84f3ce58321c",
      "https://www.notion.so/4a3c3e77-ceea-4851-a937-d36d4c4ae04c-4a3c3e77ceea4851a937d36d4c4ae04c",
      "https://www.notion.so/743cdb8c-e1db-47df-a813-2623e9cea8d1-743cdb8ce1db47dfa8132623e9cea8d1",
      "https://www.notion.so/91e5ff09-72af-498d-b6ff-4d10801e1aa5-91e5ff0972af498db6ff4d10801e1aa5",
      "https://www.notion.so/934acc88-3885-48db-bb8c-47af5ecbb858-934acc88388548dbbb8c47af5ecbb858",
      "https://www.notion.so/cfc2e143-cd7f-4dd7-8af0-006f1282a0ea-cfc2e143cd7f4dd78af0006f1282a0ea",
      "https://www.notion.so/b433f46b-7a8a-45c5-8083-305de37f8aa5-b433f46b7a8a45c58083305de37f8aa5",
      "https://www.notion.so/8169f46c-8933-4bba-9494-052c1b5288cc-8169f46c89334bba9494052c1b5288cc",
      "https://www.notion.so/4a5abac6-d66e-4160-9c7d-6e4d68f9b636-4a5abac6d66e41609c7d6e4d68f9b636",
      "https://www.notion.so/9ec1af5b-bc13-4148-bfbe-14294e985829-9ec1af5bbc134148bfbe14294e985829",
      "https://www.notion.so/ab30d2fa-7f73-4952-ba5e-7bcf95ba16fc-ab30d2fa7f734952ba5e7bcf95ba16fc",
      "https://www.notion.so/19ade066-9f12-4064-b08f-42a901e6e8cd-19ade0669f124064b08f42a901e6e8cd"];
    
    console.log("Number of pages:", notionUrls.length);
    console.log("pages:", notionUrls)
    const BATCH_SIZE = notionUrls.length;
    const mainPage = await getPage(browser);
    for(let i = 0; i < BATCH_SIZE; i++){
      
      
      await upload_image_notion(mainPage, notionUrls[i], imagePaths[i]);
      // Close the browser
      
      // sleep for 5 seconds
      
      // await new Promise(resolve => setTimeout(resolve, 10000));
      
    }
    await mainPage.close();
    browser.disconnect();
    console.log("All images uploaded");
}

main().catch(console.error);