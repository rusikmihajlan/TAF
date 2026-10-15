import { BasePage } from '../../core/BasePage.js';
export class LoginPage extends BasePage {
  async open() {
    await this.openPath('/auth/login', '[data-test="email"]');
  }

  async signIn({ email, password }) {
    await this.fill('[data-test="email"]', email);
    await this.fill('[data-test="password"]', password);
    await this.click('[data-test="login-submit"]');
    await this.browser.waitUntil(async () => new URL(await this.browser.getUrl()).pathname === '/account', {
      timeoutMsg: 'Login did not redirect to the account overview'
    });
  }
}
