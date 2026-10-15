import { browser } from '@wdio/globals';
import { expect } from 'chai';
import { CustomerFlow } from '../../src/business/flows/CustomerFlow.js';
import { createCustomer } from '../fixtures/customer.js';
import { ProfilePage } from '../../src/business/pages/ProfilePage.js';
describe('Area 2: User profile', () => {
  it('confirms and persists the updated street address', async () => {
    await new CustomerFlow(browser).registerAndSignIn(createCustomer());
    const profile = new ProfilePage(browser);
    await profile.open();
    const street = '123 Automation Way';
    await profile.updateStreet(street);
    expect(await profile.confirmation()).to.include('Your profile is successfully updated!');
    await profile.open();
    expect(await profile.street()).to.equal(street);
  });
});
