import { BasePage } from '../../core/BasePage.js';
export class ProfilePage extends BasePage {
  async open() {
    await this.openPath('/account/profile', '[data-test="street"]');
    await this.browser.waitUntil(async () => (await this.browser.$('[data-test="email"]').getValue()).length > 0, {
      timeoutMsg: 'Profile data was not loaded'
    });
  }

  async updateStreet(street) {
    await this.fill('[data-test="street"]', street);
    await this.click('[data-test="update-profile-submit"]');
  }

  async confirmation() {
    return this.text('.alert-success[role="alert"]');
  }

  async street() {
    return (await this.visible('[data-test="street"]')).getValue();
  }
}
