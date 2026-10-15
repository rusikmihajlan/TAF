import { BasePage } from '../../core/BasePage.js';
export class FavoritesPage extends BasePage {
  async open() {
    await this.openPath('/account/favorites', '[data-test="page-title"]');
  }

  async productNames() {
    await this.visible('[data-test="product-name"]');
    return this.browser.$$('[data-test="product-name"]').map(element => element.getText());
  }
}
