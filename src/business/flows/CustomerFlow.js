import { RegistrationPage } from '../pages/RegistrationPage.js';
import { LoginPage } from '../pages/LoginPage.js';
/** Reusable business workflow; assertions remain in the tests layer. */
export class CustomerFlow {
  constructor(browser) {
    this.registration = new RegistrationPage(browser);
    this.login = new LoginPage(browser);
  }

  async registerAndSignIn(customer) {
    await this.registration.register(customer);
    await this.login.signIn(customer);
  }
}
