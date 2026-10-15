import { BasePage } from '../../core/BasePage.js';
export class Header extends BasePage {
  async cartQuantity() {
    return Number(await this.text('[data-test="cart-quantity"]'));
  }
}
