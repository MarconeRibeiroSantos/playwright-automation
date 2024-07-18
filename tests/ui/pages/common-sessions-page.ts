import { type Locator, type Page, expect } from "@playwright/test";
import testData from "../../../utils/testData.json";

export class CommonSessionsPage {
  readonly page: Page;
  
  
  /*---------------------------------------------VARIABLES--------------------------------------------------*/

  readonly baseUrl: string = testData.endpoints.baseUrl;
  readonly txt_exemple_title: string = "Example"; 

  /*----------------------------------------SECTION NAME LOCATORS-------------------------------------------*/

  readonly LNK_METRICTAB_HEADER: Locator;
  readonly BTN_TASKTAB_HEADER: Locator;
  readonly BTN_FILEMANAGERTAB_HEADER: Locator;
  readonly BTN_MAPTAB_HEADER: Locator;
  readonly BTN_TABULARTAB_HEADER: Locator;
  readonly BTN_REPORTTAB_HEADER: Locator;
  readonly BTN_FILE_MANAGER_TAB_HEADER: Locator;
  readonly BTN_TABULAR_TAB_HEADER: Locator;
  readonly BTN_REPORTS_TAB_HEADER: Locator;

  readonly LST_USERNAMETAB_HEADER: Locator;
  readonly DPD_LOGOUTTAB_HEADER: Locator;
  readonly DPD_FEATURESDISPLAY_HEADER: Locator;
  readonly DPD_REPORTISSUE_HEADER: Locator;
  readonly DPD_SETTINGS_HEADER: Locator;

  /*----------------------------------------SECTION ELEMENT LOCATORS-----------------------------------------*/
  constructor(page: Page) {
    this.page = page;

    this.LNK_METRICTAB_HEADER = page.getByRole("link", { name: "Metric" });
    this.BTN_TASKTAB_HEADER = page.locator("#app-wrapper").getByRole("link", { name: "Tasks" });
    this.BTN_FILEMANAGERTAB_HEADER = page.getByTitle("File Manager", { exact: true });
    this.BTN_MAPTAB_HEADER = page.getByTitle("Map", { exact: true });
    this.BTN_TABULARTAB_HEADER = page.getByTitle("Tabular", { exact: true });
    this.BTN_REPORTTAB_HEADER = page.getByTitle("Reports", { exact: true });
    this.BTN_FILE_MANAGER_TAB_HEADER = page.getByTitle("File Manager", { exact: true });

    this.LST_USERNAMETAB_HEADER = page.getByTitle("Luis Guerra");
    this.DPD_LOGOUTTAB_HEADER = page.getByTitle("Logout");
    this.DPD_FEATURESDISPLAY_HEADER = page.getByTitle("Features Display");
    this.DPD_REPORTISSUE_HEADER = page.getByTitle("Report Issue");
    this.DPD_SETTINGS_HEADER = page.getByTitle("Settings", { exact: true });
    this.BTN_TABULAR_TAB_HEADER = page.getByTitle("Tabular");
    this.BTN_REPORTS_TAB_HEADER = page.getByTitle("Reports");
  }

  /*-----------------------------------------SECTION PAGE ACTIONS-------------------------------------------*/

  async assertPageUrlEndpointIs(endpointExp?: string) {
    try {
      if (endpointExp === null) {
        await expect(this.page).toHaveURL(this.baseUrl);
      }
    } catch (error) {
      const urlExp = `${this.baseUrl}app/#${endpointExp}`;
      await expect(this.page).toHaveURL(urlExp);
    }
  }

  async whenIHoverOnUserNameTapToOpenMenuList() {
    await this.LST_USERNAMETAB_HEADER.click();
  }

  async whenIAccessHeaderTabToLogout() {
    await this.whenIHoverOnUserNameTapToOpenMenuList();
    await this.DPD_LOGOUTTAB_HEADER.click();
  }

  async whenIAccessHeaderTabToFeaturesDisplay() {
    await this.whenIHoverOnUserNameTapToOpenMenuList();
    await this.DPD_FEATURESDISPLAY_HEADER.click();
  }

  async whenIAccessHeaderTabToReportIssue() {
    await this.whenIHoverOnUserNameTapToOpenMenuList();
    await this.DPD_REPORTISSUE_HEADER.click();
  }
  async whenIAccessHeaderTabToSettings() {
    await this.whenIHoverOnUserNameTapToOpenMenuList();
    await this.DPD_SETTINGS_HEADER.click();
  }

  async whenIClickOnMapTap() {
    await this.BTN_MAPTAB_HEADER.click();
    await this.assertPageUrlEndpointIs(testData.endpoints.map);
  }
  async whenIClickOnTaskTab() {
    await this.BTN_TASKTAB_HEADER.click();
    await this.assertPageUrlEndpointIs(testData.endpoints.tasks);
  }

  async whenIClickOnFileManagerTab() {
    await this.BTN_FILE_MANAGER_TAB_HEADER.click();
    await this.assertPageUrlEndpointIs(testData.endpoints.manager);
  }

  async whenIClickOnTabularTab() {
    await this.BTN_TABULAR_TAB_HEADER.click();
    await this.assertPageUrlEndpointIs(testData.endpoints.tabular);
  }

  async whenIClickOnReportsTab() {
    await this.BTN_REPORTS_TAB_HEADER.click();
    await this.assertPageUrlEndpointIs(testData.endpoints.repots);
  }
}

export default CommonSessionsPage;
