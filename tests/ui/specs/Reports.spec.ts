import { test, expect } from "@playwright/test";
import ReportsPage from "../pages/reports-page";
import testData from "../../../utils/testData.json";
import CommonSessionsPage from "../pages/common-sessions-page";
import AccessPage from "../pages/access-page";

let reportsPage: ReportsPage;
let commonSessionsPage: CommonSessionsPage;
let accessPage: AccessPage;

test.beforeEach(async ({ page }) => {
  const URL = testData.endpoints.baseUrl;
  await page.goto(URL);
  reportsPage = new ReportsPage(page);
  commonSessionsPage = new CommonSessionsPage(page);
  accessPage = new AccessPage(page);

  await accessPage.whenIGoToLoginForm();
  await accessPage.whenILoginWithLuis(
    testData.validLoginTest.email,
    testData.validLoginTest.password
  );
  await commonSessionsPage.whenIClickOnReportsTab();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Scenario 01: ", () => {
  test("When I access Reports, Then I should see reports url endpoint", async ({
    page,
  }) => {
    //Assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.repots);
  });
});
