import { browser } from '@wdio/globals';
import { expect } from 'chai';
import { CatalogPage } from '../../src/business/pages/CatalogPage.js';
describe('Area 7: Sorting', () => {
  it('sorts every result by ascending price with the cheapest first', async () => {
    const catalog = new CatalogPage(browser);
    await catalog.open();
    await catalog.sortByLowestPrice();
    const prices = (await catalog.allProducts()).map(product => product.price);
    expect(prices.length).to.be.greaterThan(1);
    for (const price of prices) expect(price).to.be.finite;
    expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    expect(prices[0]).to.equal(Math.min(...prices));
  });
});
