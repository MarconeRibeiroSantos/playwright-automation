import { test, expect } from "@playwright/test";
import testData from "../../../utils/testData.json";
import CommonSessionsPage from "../pages/common-sessions-page";
import AccessPage from "../pages/access-page";
import FeaturesPage from "../pages/features-page";

let featuresPage: FeaturesPage;
let commonSessionsPage: CommonSessionsPage;
let accessPage: AccessPage;

test.beforeEach(async ({ page }) => {
  const URL = testData.endpoints.baseUrl;
  await page.goto(URL);
  commonSessionsPage = new CommonSessionsPage(page);
  accessPage = new AccessPage(page);
  featuresPage = new FeaturesPage(page);
  await accessPage.whenIGoToLoginForm();
  await accessPage.whenILoginWithLuis(
    testData.validLoginTest.email,
    testData.validLoginTest.password
  );
  await commonSessionsPage.whenIAccessHeaderTabToFeaturesDisplay();
  await page.reload();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Scenario 01: Share Features", () => {
  test("10.01.001 - When I share feature, Then I see success message displayed", async ({
    page,
  }) => {
    //act
    await featuresPage.whenISearchFeature("DT Kpis Description");
    await featuresPage.whenIShareFeatureToTeamMember();

    //assert
    await featuresPage.assertShareSuccessMessageIsDisplayed();
  });
});
