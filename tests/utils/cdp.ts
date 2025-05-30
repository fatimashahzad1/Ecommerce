import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Connect to CDP session
  const client = await context.newCDPSession(page);

  // Enable Network domain
  await client.send('Network.enable');

  // Listen to all network requests
  client.on('Network.requestWillBeSent', (params) => {
    console.log(
      '➡️ [CDP]',
      params.request.method,
      params.request.url,
      '🔥',
      params.request
    );
  });

  // Listen to responses
  client.on('Network.responseReceived', (params) => {
    console.log(
      '⬅️ [CDP]',
      params.response.status,
      params.response.url,
      '🔥',
      params.response
    );
  });

  await page.goto('https://ecommerce-omega-three-23.vercel.app/login');

  // Interact with page here...
})();
