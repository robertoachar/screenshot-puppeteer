import puppeteer from 'puppeteer';

const start = async (url) => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    headless: true,
  });
  console.log(`Browser is connected: ${browser.isConnected()}`);

  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 800,
    deviceScaleFactor: 2,
  });

  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.url().includes('ungrabber')) {
      console.log(request.url());
      request.abort();
    } else {
      request.continue();
    }
  });

  console.log(`Loading ${url}`);
  await page.goto(url, {
    timeout: 30000,
    waitUntil: 'networkidle0',
  });

  await page.waitFor(5 * 1000);

  console.log(`Taking screenshot...`);
  const screenshot = await page.screenshot({ fullPage: true });

  await browser.close();
  console.log(`Browser is connected: ${browser.isConnected()}`);

  return screenshot;
};

export default start;
