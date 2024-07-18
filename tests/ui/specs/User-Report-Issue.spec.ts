import { test, expect } from "@playwright/test";
import ReportIssuePage from "../pages/report-issue-page";
import testData from "../../../utils/testData.json";
import CommonSessionsPage from "../pages/common-sessions-page";
import AccessPage from "../pages/access-page";
import MapPage from "../pages/map-page";

let reportIssuePage: ReportIssuePage;
let commonSessionsPage: CommonSessionsPage;
let accessPage: AccessPage;
let mapPage: MapPage;

test.beforeEach(async ({ page }) => {
  const URL = testData.endpoints.baseUrl;
  await page.goto(URL);
  reportIssuePage = new ReportIssuePage(page);
  commonSessionsPage = new CommonSessionsPage(page);
  accessPage = new AccessPage(page);
  mapPage = new MapPage(page);

  await accessPage.whenIGoToLoginForm();
  await accessPage.whenILoginWithLuis(
    testData.validLoginTest.email,
    testData.validLoginTest.password
  );
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Scenario 01: Open Issue", () => {
  test("11.01.001 - When I report an issue, Then I should see the growl message confirming the report", async ({
    page,
  }) => {
    //act
    await commonSessionsPage.whenIAccessHeaderTabToReportIssue();
    await reportIssuePage.whenIEnterReportIssueDetails();

    //assert
    await reportIssuePage.assertGrowlMessageIsDisplayed();
  });
});
