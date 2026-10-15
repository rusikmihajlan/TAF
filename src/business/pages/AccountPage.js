import { BasePage } from '../../core/BasePage.js';
export class AccountPage extends BasePage {
  async title() {
    return this.text('[data-test="page-title"]');
  }

  async path() {
    return new URL(await this.browser.getUrl()).pathname;
  }
}
