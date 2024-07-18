import { test, expect } from "@playwright/test";
import testData from "../../../utils/testData.json";
import SettingsPage from "../pages/settings-page";
import AccessPage from "../pages/access-page";
import CommonSessionsPage from "../pages/common-sessions-page";

let settingsPage: SettingsPage;
let accessPage: AccessPage;
let commonSessionsPage: CommonSessionsPage;

test.beforeEach(async ({ page }) => {
  const URL = testData.endpoints.baseUrl;
  await page.goto(URL);
  settingsPage = new SettingsPage(page);
  accessPage = new AccessPage(page);
  commonSessionsPage = new CommonSessionsPage(page);

  await accessPage.whenIGoToLoginForm();
  await accessPage.whenILoginWithLuis(
    testData.validLoginTest.email,
    testData.validLoginTest.password
  );
  await commonSessionsPage.whenIAccessHeaderTabToSettings();
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Scenario 01: Profile", () => {
  test("03.01.001 - When I try to update user picture, Then I see resize options", async ({
    page,
  }) => {
    //act
    await settingsPage.whenIUploadProfilePicture();

    //assert
    await settingsPage.assertResizeOptionIsAvailable();

    await settingsPage.whenIClickOnConfirmButton();
    await settingsPage.assertPictureWasUpdated();
  });
});
