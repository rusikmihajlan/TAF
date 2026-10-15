import { browser } from '@wdio/globals';
import { expect } from 'chai';
import { CatalogPage } from '../../src/business/pages/CatalogPage.js';
describe('Area 6: Search', () => {
  it('returns only Hammer matches across all result pages', async () => {
    const catalog = new CatalogPage(browser);
    await catalog.open();
    await catalog.search('Hammer');
    const products = await catalog.allProducts();
    expect(products).not.to.be.empty;
    for (const product of products) expect(product.name).to.match(/hammer/i);
  });
});
