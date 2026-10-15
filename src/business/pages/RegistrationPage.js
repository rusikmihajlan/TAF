import { BasePage } from '../../core/BasePage.js';
export class RegistrationPage extends BasePage {
  async register(customer) {
    await this.openPath('/auth/register', '[data-test="first-name"]');
    await this.browser.$('[data-test="country"]').selectByAttribute('value', customer.country);
    const fields = {
      'first-name': customer.firstName, 'last-name': customer.lastName,
      dob: customer.dateOfBirth, postal_code: customer.postalCode,
      house_number: customer.houseNumber, street: customer.street,
      city: customer.city, state: customer.state, phone: customer.phone,
      email: customer.email, password: customer.password
    };
    for (const [field, value] of Object.entries(fields)) {
      await this.fill(`[data-test="${field}"]`, value);
    }
    await this.click('[data-test="register-submit"]');
    await this.browser.waitUntil(async () => new URL(await this.browser.getUrl()).pathname === '/auth/login', {
      timeoutMsg: 'Registration did not complete; check the registration form errors'
    });
  }
}
