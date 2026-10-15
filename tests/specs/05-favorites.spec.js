import { browser } from '@wdio/globals';
import { expect } from 'chai';
import { CustomerFlow } from '../../src/business/flows/CustomerFlow.js';
import { createCustomer } from '../fixtures/customer.js';
import { CatalogPage } from '../../src/business/pages/CatalogPage.js';
import { ProductPage } from '../../src/business/pages/ProductPage.js';
import { FavoritesPage } from '../../src/business/pages/FavoritesPage.js';
describe('Area 5: Favorites', () => {
  it('lists the exact product added by the current customer', async () => {
    await new CustomerFlow(browser).registerAndSignIn(createCustomer());
    const catalog = new CatalogPage(browser);
    await catalog.open();
    await catalog.openProduct('Combination Pliers');
    await new ProductPage(browser).addToFavorites();
    const favorites = new FavoritesPage(browser);
    await favorites.open();
    expect(await favorites.productNames()).to.deep.equal(['Combination Pliers']);
  });
});
