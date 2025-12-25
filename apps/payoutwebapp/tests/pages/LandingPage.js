const LANDING_PAGE_URL = `${process.env.DASHBOARD_URL}/${process.env.MERCHANT_APP_BASE_PATH}/landing?env=prod`;

class LandingPage {
  constructor(page) {
    this.page = page;
    this.url = LANDING_PAGE_URL;
    this.content = page.locator('.landing-content');
    this.loader = page.locator('.loader-box-wrapper');
    this.card = page.locator('');
    this.svgLocator = page.locator('svg.cross.pointer');
    this.card = page
      .locator('#jwt-auth-form div')
      .filter({ hasText: 'Products Activated' })
      .nth(2);
    this.nonactivatedCard = page
      .locator('#jwt-auth-form div')
      .filter({ hasText: 'Other Available Products' })
      .nth(2);
  }

  async load() {
    await this.page.goto(this.url);
    await this.content.waitFor({ state: 'visible' });
    await this.loader.waitFor({ state: 'detached' });
    await this.card.waitFor({ state: 'visible' });
    await this.nonactivatedCard.waitFor({ state: 'visible' });
  }

  async waitVisible() {
    await this.content.waitFor({ state: 'visible' });
    await this.loader.waitFor({ state: 'detached' });
  }

  async clickCardAccess(activatedProduct, name) {
    const productSelector = `.product-list-wrapper > div:nth-child(${
      activatedProduct ? 1 : 2
    }) .product-list .product`;

    try {
      await this.page.waitForSelector(productSelector);

      const productArray = await this.page.$$(productSelector);

      const indexes = await Promise.all(
        productArray.map(async (productElement, index) => {
          const h3Element = await productElement.$('h3');
          const textContent = h3Element ? await h3Element.textContent() : '';
          return textContent.trim() === name ? index : -1;
        }),
      );

      const foundIndex = indexes.findIndex((index) => index !== -1);

      if (foundIndex !== -1) {
        const foundProduct = productArray[foundIndex];

        const buttonElement = await foundProduct.$('button');

        if (buttonElement) {
          this.card = buttonElement;
          await this.card.click();
        } else {
          console.error('Button not found within the product element');
        }
      } else {
        console.error('Product not found', name);
      }
    } catch (error) {
      console.error('Error in clickCardAccess:', error);
    }
  }

  async checkCrossButtonandClick() {
    const isVisible = await this.svgLocator.isVisible();
    if (isVisible) {
      await this.page.keyboard.press('Escape');
      console.log('ESC key was simulated');
    }
    await this.svgLocator.waitFor({ state: 'detached' });
  }
}

export default LandingPage;
