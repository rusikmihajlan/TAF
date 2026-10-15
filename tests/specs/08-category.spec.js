import { browser } from '@wdio/globals';
import { expect } from 'chai';
import { CatalogPage } from '../../src/business/pages/CatalogPage.js';
import { ProductPage } from '../../src/business/pages/ProductPage.js';
describe('Area 8: Categories', () => {
  it('shows only products belonging to Hand Tools and its subcategories', async () => {
    const catalog = new CatalogPage(browser);
    await catalog.open();
    const allowedCategories = await catalog.filterHandTools();
    expect(allowedCategories).to.include('Hand Tools');
    const products = await catalog.allProducts();
    expect(products).not.to.be.empty;
    const detailPage = new ProductPage(browser);
    for (const product of products) {
      await detailPage.open(product.url);
      const details = await detailPage.details();
      expect(allowedCategories, `${product.name} belongs to ${details.category}`).to.include(details.category);
    }
  });
});
