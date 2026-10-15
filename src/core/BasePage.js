/** Browser mechanics only: no application routes, selectors or test data. */
export class BasePage {
  constructor(browser) {
    this.browser = browser;
  }

  async openPath(path, readySelector) {
    await this.browser.url(path);
    await this.visible(readySelector);
  }

  async visible(selector) {
    const element = this.browser.$(selector);
    await element.waitForDisplayed();
    return element;
  }

  async click(selector) {
    const element = await this.visible(selector);
    await element.waitForClickable();
    await element.click();
  }

  async fill(selector, value) {
    const element = await this.visible(selector);
    await element.setValue(value);
  }

  async text(selector) {
    return (await this.visible(selector)).getText();
  }
}
