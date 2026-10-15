import { browser } from '@wdio/globals';
import { expect } from 'chai';
import { CatalogPage } from '../../src/business/pages/CatalogPage.js';
import { ProductPage } from '../../src/business/pages/ProductPage.js';
import { Header } from '../../src/business/components/Header.js';
describe('Area 4: Basket', () => {
  it('shows two items after adding two Pliers to an empty cart', async () => {
    const catalog = new CatalogPage(browser);
    await catalog.open();
    await catalog.openProduct('Pliers');
    await new ProductPage(browser).addToCart(2);
    expect(await new Header(browser).cartQuantity()).to.equal(2);
  });
});
