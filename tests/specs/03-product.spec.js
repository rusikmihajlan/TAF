import { browser } from '@wdio/globals';
import { expect } from 'chai';
import { CatalogPage } from '../../src/business/pages/CatalogPage.js';
import { ProductPage } from '../../src/business/pages/ProductPage.js';
describe('Area 3: Product details', () => {
  it('shows the selected product name, price and description', async () => {
    const catalog = new CatalogPage(browser);
    await catalog.open();
    await catalog.openProduct('Combination Pliers');
    const details = await new ProductPage(browser).details();
    expect(details.name).to.equal('Combination Pliers');
    expect(details.price).to.be.finite.and.greaterThan(0);
    expect(details.description.trim()).not.to.equal('');
  });
});
