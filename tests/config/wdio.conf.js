import { readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../../', import.meta.url));
const specDirectory = path.join(root, 'tests/specs');
const specs = readdirSync(specDirectory).filter(name => name.endsWith('.spec.js')).sort();
if (process.env.TEST_ORDER === 'reverse') specs.reverse();
const args = ['--disable-dev-shm-usage', '--window-size=1440,1000', '--lang=en-US'];
if (process.env.HEADLESS !== 'false') args.push('--headless=new');
if (process.env.BROWSER_PROXY) args.push(`--proxy-server=${process.env.BROWSER_PROXY}`);
export const config = {
  runner: 'local',
  specs: specs.map(name => path.join(specDirectory, name)),
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    acceptInsecureCerts: false,
    'goog:chromeOptions': {
      args,
      ...(process.env.CHROME_BIN ? { binary: process.env.CHROME_BIN } : {})
    },
    ...(process.env.CHROMEDRIVER_BIN ? {
      'wdio:chromedriverOptions': { binary: process.env.CHROMEDRIVER_BIN }
    } : {})
  }],
  baseUrl: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
  logLevel: 'error',
  framework: 'mocha',
  reporters: ['spec'],
  injectGlobals: false,
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 0,
  specFileRetries: 0,
  mochaOpts: { ui: 'bdd', timeout: 180000, retries: 0 },
  // A new WebDriver session per spec; each spec contains one independent scenario.
  async afterTest(test, context, { passed }) {
    if (!passed) {
      const { browser } = await import('@wdio/globals');
      const directory = path.join(root, 'artifacts');
      mkdirSync(directory, { recursive: true });
      await browser.saveScreenshot(path.join(directory, `${test.title.replace(/[^a-z0-9]+/gi, '-')}.png`));
    }
  }
};
