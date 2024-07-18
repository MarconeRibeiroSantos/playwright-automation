import { test, expect } from "@playwright/test";
import CommonSessionsPage from "../pages/common-sessions-page";
import AccessPage from "../pages/access-page";
import testData from "../../../utils/testData.json";

let accessPage: AccessPage;
let commonSessionsPage: CommonSessionsPage;

test.beforeEach(async ({ page }) => {
  const URL = "https://unitel-dev.metric.pt/";
  await page.goto(URL);
  accessPage = new AccessPage(page);
  commonSessionsPage = new CommonSessionsPage(page);
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Scenario: Login", () => {
  test("01.01.001 - When I access baseUrl, Then I see welcome page", async ({
    page,
  }) => {
    //Assert
    await accessPage.assertLoginButtonIsVisible();
  });

  test("01.01.002 - When I try to login with valid credentials, Then I login", async ({
    page,
  }) => {
    //Act
    await accessPage.whenIGoToLoginForm();
    await accessPage.whenILoginWithLuis(
      testData.validLoginTest.email,
      testData.validLoginTest.password
    );

    //Assert
    await accessPage.assertHelloMessageIsVisible();
    await accessPage.assertUserNameLoggedIn();
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
  });

  test("01.01.003 - When I try to login with invalid credentials, Then I see error message", async ({
    page,
  }) => {
    //Act
    await accessPage.whenIGoToLoginForm();
    await accessPage.whenItryToLogin(
      testData.invalidLoginUser.email,
      testData.invalidLoginUser.password
    );

    //Assert
    await commonSessionsPage.assertPageUrlEndpointIs();
    await accessPage.assertLoginErrorMessage();
  });

  test("01.01.004 - When I try to login without credentials, Then I see required field message", async ({
    page,
  }) => {
    //Act
    await accessPage.whenIGoToLoginForm();
    await accessPage.whenItryToLogin(
      testData.invalidLoginNull.email,
      testData.invalidLoginNull.password
    );

    //Assert
    await commonSessionsPage.assertPageUrlEndpointIs();
    await accessPage.assertUsernameAndPasswordPlaceholderIsVisible();
    await accessPage.assertRequiredMessageErrorIsVisible();
  });

  test("01.01.005 - When I try to logout, Then I am moved to Welcome page", async ({
    page,
  }) => {
    //Act
    await accessPage.whenIGoToLoginForm();
    await accessPage.whenItryToLogin(
      testData.validLoginTest.email,
      testData.validLoginTest.password
    );
    await commonSessionsPage.whenIAccessHeaderTabToLogout();

    //Assert
    await accessPage.assertLoginButtonIsVisible();
  });
});

test.describe("Scenario: Homepage News", () => {
  test("01.02.001 - When I select a News to read, Then I can go to other news", async ({
    page,
  }) => {
    //Act
    await accessPage.whenIGoToLoginForm();
    await accessPage.whenItryToLogin(
      testData.validLoginTest.email,
      testData.validLoginTest.password
    );

    await accessPage.whenIClickOnNewsCard();
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.news);
    await accessPage.whenISelecAcardOnScrollList();

    //assert
    await accessPage.assertNewsContentWasChanged();
  });
});
