import { test, expect } from "@playwright/test";
import FileManagerPage from "../pages/file-manager.page";
import testData from "../../../utils/testData.json";
import CommonSessionsPage from "../pages/common-sessions-page";
import AccessPage from "../pages/access-page";

let fileManagerPage: FileManagerPage;
let commonSessionsPage: CommonSessionsPage;
let accessPage: AccessPage;

test.beforeEach(async ({ page }) => {
  const URL = testData.endpoints.baseUrl;
  await page.goto(URL);
  fileManagerPage = new FileManagerPage(page);
  commonSessionsPage = new CommonSessionsPage(page);
  accessPage = new AccessPage(page);

  await accessPage.whenIGoToLoginForm();
  await accessPage.whenILoginWithLuis(
    testData.validLoginTest.email,
    testData.validLoginTest.password
  );
  await commonSessionsPage.whenIClickOnFileManagerTab();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Scenario 01: ", () => {
  test("When I access File Manager, Then I should see file manager url endpoint", async ({
    page,
  }) => {
    //Assert
    await commonSessionsPage.assertPageUrlEndpointIs(
      testData.endpoints.features
    );
  });
});
