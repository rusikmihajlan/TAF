import { browser } from '@wdio/globals';
import { expect } from 'chai';
import { RegistrationPage } from '../../src/business/pages/RegistrationPage.js';
import { LoginPage } from '../../src/business/pages/LoginPage.js';
import { AccountPage } from '../../src/business/pages/AccountPage.js';
import { createCustomer } from '../fixtures/customer.js';
describe('Area 1: Sign in', () => {
  it('redirects a customer with valid credentials to the account overview', async () => {
    const customer = createCustomer();
    await new RegistrationPage(browser).register(customer);
    const login = new LoginPage(browser);
    await login.open();
    await login.signIn(customer);
    const account = new AccountPage(browser);
    expect(await account.path()).to.equal('/account');
    expect(await account.title()).to.equal('My account');
  });
});
