import { BasePage } from '../../core/BasePage.js';
export class CatalogPage extends BasePage {
  async open() {
    await this.openPath('/', '[data-test="product-name"]');
  }

  async openProduct(name) {
    const card = this.browser.$(`h5=${name}`);
    await card.waitForClickable();
    await card.click();
    await this.visible('[data-test="product-description"]');
  }

  async search(query) {
    await this.fill('[data-test="search-query"]', query);
    await this.click('[data-test="search-submit"]');
    await this.visible('[data-test="search_completed"]');
  }

  async sortByLowestPrice() {
    await this.browser.$('[data-test="sort"]').selectByAttribute('value', 'price,asc');
    await this.visible('[data-test="sorting_completed"]');
  }

  async filterHandTools() {
    const label = this.browser.$('label=Hand Tools');
    await label.waitForDisplayed();
    // The UI defines which child categories belong to Hand Tools.
    const group = label.$('..');
    const categories = await group.$$('label').map(element => element.getText());
    await label.click();
    await this.visible('[data-test="filter_completed"]');
    return categories.map(name => name.trim());
  }

  async allProducts() {
    const products = [];
    const visited = new Set();
    while (true) {
      await this.visible('a.card[data-test^="product-"]');
      const cards = await this.browser.$$('a.card[data-test^="product-"]');
      const firstUrl = await cards[0].getAttribute('href');
      if (visited.has(firstUrl)) throw new Error('Pagination repeated a product page');
      visited.add(firstUrl);
      for (const card of cards) {
        products.push({
          name: (await card.$('[data-test="product-name"]').getText()).trim(),
          price: Number((await card.$('[data-test="product-price"]').getText()).replace('$', '')),
          url: await card.getAttribute('href')
        });
      }
      const next = this.browser.$('[data-test="pagination-next"]');
      if (!await next.isExisting() || (await next.$('..').getAttribute('class')).includes('disabled')) break;
      await next.click();
      await this.browser.waitUntil(async () => {
        const first = this.browser.$('a.card[data-test^="product-"]');
        return await first.isExisting() && await first.getAttribute('href') !== firstUrl;
      }, { timeoutMsg: 'The next product page did not load' });
    }
    return products;
  }
}
