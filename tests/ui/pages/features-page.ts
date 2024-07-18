import { type Locator, type Page, expect } from "@playwright/test";

export class FeaturesPage {
  readonly page: Page;

  /*---------------------------------------------VARIABLES--------------------------------------------------*/

  /*----------------------------------------SECTION NAME LOCATORS-------------------------------------------*/
  readonly FLD_SEARCH_FEATURESPAGE: Locator;
  readonly BTN_SHAREITEM_FEATURESPAGE: Locator;
  readonly BTN_FIRSTUSER_FEATURESPAGE: Locator;
  readonly BTN_SHARE_FEATURESPAGE: Locator;
  readonly TXT_SHARESUCCESSMESSAGE_FEATURESPAGE: Locator;
  readonly BTN_SHOWMOREITENS_FEATURESPAGE: Locator;

  /*----------------------------------------SECTION ELEMENT LOCATORS-----------------------------------------*/
  constructor(page: Page) {
    this.FLD_SEARCH_FEATURESPAGE = page.getByPlaceholder("Search");
    this.BTN_SHAREITEM_FEATURESPAGE = page.locator('a.post-thumbnail-share').first();
    this.BTN_FIRSTUSER_FEATURESPAGE = page.locator(".user-img > img").first();
    this.BTN_SHARE_FEATURESPAGE = page.getByRole("button", { name: "Share" });
    this.TXT_SHARESUCCESSMESSAGE_FEATURESPAGE = page.getByText("Post shared successfully!");
    this.BTN_SHOWMOREITENS_FEATURESPAGE = page.getByText("SHOW MORE");
  }

  /*-----------------------------------------SECTION PAGE ACTIONS-------------------------------------------*/
  async whenISearchFeature(searchfortext: string) {
    await this.FLD_SEARCH_FEATURESPAGE.click();
    await this.FLD_SEARCH_FEATURESPAGE.type(searchfortext);
  }

  async whenIShareFeatureToTeamMember() {
    await this.BTN_SHAREITEM_FEATURESPAGE.click();

    await this.BTN_FIRSTUSER_FEATURESPAGE.click();
    await this.BTN_SHARE_FEATURESPAGE.click();
  }

  async assertShareSuccessMessageIsDisplayed() {
    //success message
    await this.TXT_SHARESUCCESSMESSAGE_FEATURESPAGE.isVisible();
  }
}

export default FeaturesPage;
