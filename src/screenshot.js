import puppeteer from 'puppeteer';

const start = async (url) => {
  const browser = await puppeteer.launch();
  console.log(`Browser is connected: ${browser.isConnected()}`);

  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 800,
    deviceScaleFactor: 2,
  });

  console.log(`Loading ${url}`);
  await page.goto(url, {
    timeout: 60000,
    waitUntil: 'networkidle0',
  });

  console.log(`Taking screenshot...`);
  const screenshot = await page.screenshot();

  await browser.close();
  console.log(`Browser is connected: ${browser.isConnected()}`);

  return screenshot;
};

export default start;
