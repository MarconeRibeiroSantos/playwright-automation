import { Page } from 'playwright';

export class BrowseTheWeb {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit(url: string) {
    await this.page.goto(url);
  }

  async enterText(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }
}
