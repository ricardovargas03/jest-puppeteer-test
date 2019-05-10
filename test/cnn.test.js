const  puppeteer = require('puppeteer'),
 timeout = 60000;

let page, browser

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [`--start-maximized`]
  });

  width = 1920,
    height = 1080;

  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto('http://www.cnn.com/');

}, timeout);

afterAll(() => {
  browser.close();
});


test("Search Success", async () => {

  await page.waitForSelector("[id=search-button]")
  await page.click("[id=search-button]")
  await page.type("[id=search-button]", "NFL")
  await page.click("[id=submit-button]")
  await page.waitForSelector('.cnn-search__results-list > .cnn-search__result')


});

test("Search Fail", async () => {

  await page.waitForSelector("[id=search-button]")
  await page.click("[id=search-button]")
  await page.type("[id=search-button]", "NFLFake")
  await page.click("[id=submit-button]")
  await page.waitForSelector('.cnn-search__results-list > .cnn-search__no-results')

});