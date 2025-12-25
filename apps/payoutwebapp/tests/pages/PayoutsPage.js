import { expect } from '../config/fixtures';
class PayoutsPage {
  constructor(page) {
    this.page = page;

    this.page = page;
    this.product = page.locator('.product-name .selected-item');
    this.productName = 'Payouts';
  }

  async loadProduct() {
    const productItem = `.selected-item >> text="${this.productName}"`;
    await this.product.waitFor({ state: 'visible' });
    const specificPayoutsOption = await this.page.locator(productItem).first();
    await expect(specificPayoutsOption).toBeVisible();
  }
}

export default PayoutsPage;
