import { test, expect } from "@playwright/test";
import TabularPage from "../pages/tabular-page";
import testData from "../../../utils/testData.json";
import CommonSessionsPage from "../pages/common-sessions-page";
import AccessPage from "../pages/access-page";

let tabularPage: TabularPage;
let commonSessionsPage: CommonSessionsPage;
let accessPage: AccessPage;

test.beforeEach(async ({ page }) => {
  const URL = testData.endpoints.baseUrl;
  await page.goto(URL);
  tabularPage = new TabularPage(page);
  commonSessionsPage = new CommonSessionsPage(page);
  accessPage = new AccessPage(page);

  await accessPage.whenIGoToLoginForm();
  await accessPage.whenILoginWithLuis(
    testData.validLoginTest.email,
    testData.validLoginTest.password
  );
  await commonSessionsPage.whenIClickOnTabularTab();
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Scenario 01: ", () => {
  test("When I access Tabular, Then I should see tabular url endpoint", async ({
    page,
  }) => {
    //Assert
    await commonSessionsPage.assertPageUrlEndpointIs(
      testData.endpoints.tabular
    );
  });
});
