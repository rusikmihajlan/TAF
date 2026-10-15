import { BasePage } from '../../core/BasePage.js';
export class ProductPage extends BasePage {
  async open(url) {
    await this.openPath(url, '[data-test="product-description"]');
  }

  async details() {
    return {
      name: await this.text('h1[data-test="product-name"]'),
      price: Number(await this.text('[data-test="unit-price"]')),
      description: await this.text('[data-test="product-description"]'),
      category: await this.text('[aria-label="category"]')
    };
  }

  async addToCart(quantity) {
    await this.fill('[data-test="quantity"]', quantity);
    await this.click('[data-test="add-to-cart"]');
    await this.visible('.toast-success');
  }

  async addToFavorites() {
    await this.click('[data-test="add-to-favorites"]');
    await this.visible('.toast-success');
  }
}
