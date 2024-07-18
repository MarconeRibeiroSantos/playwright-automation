import { test, expect } from "@playwright/test";
import TaskPage from "../pages/task-page";
import testData from "../../../utils/testData.json";
import AccessPage from "../pages/access-page";
import CommonSessionsPage from "../pages/common-sessions-page";

let taskPage: TaskPage;
let accessPage: AccessPage;
let commonSessionsPage: CommonSessionsPage;

test.beforeEach(async ({ page }) => {
  const URL = testData.endpoints.baseUrl;
  await page.goto(URL);

  taskPage = new TaskPage(page);
  accessPage = new AccessPage(page);
  commonSessionsPage = new CommonSessionsPage(page);

  await accessPage.whenIGoToLoginForm();
  await accessPage.whenILoginWithLuis(
    testData.validLoginTest.email,
    testData.validLoginTest.password
  );
  await commonSessionsPage.whenIClickOnTaskTab();
});

test.afterEach(async ({ page }) => {
  await page.reload();
  await taskPage.whenIDeleteAtaskVisibleOnList();
  await page.close();
});

test.describe("Scenario 01: Ready to start", () => {
  test("02.01.001 - When I access Tasks tab to the fist time, Then I see Ready to go button", async ({
    page,
    context,
  }) => {
    //act
    //await page.goto('https://unitel-dev.metric.pt/app/#/hall');
    await commonSessionsPage.whenIClickOnTaskTab();

    //assert
    await taskPage.assertHelloMessageIsDisplayedOnFistTaskAccess();
    //TODO: Know if should be displayed after every login
  });
});

test.describe("Scenario 02: Create task", () => {
  test("02.02.001 - When I use toggle to change view mode, Then each toggle should change the display mode", async ({
    page,
  }) => {
    //act
    //TODO: (to check when this screen should be displayed)
    //await taskPage.whenIclickOnReadyToGoButton();
    await taskPage.whenICreateAtask();

    //assert
    await taskPage.assertTaksWasCreatedAndVisibleOnListView();
    await taskPage.whenIclickOnToggleTochageTaskView();
    await taskPage.assertTaksWasCreatedAndVisibleOnCalendarView();
    await taskPage.whenIclickOnToggleTochageTaskView();
    await taskPage.assertTaksWasCreatedAndHiddedByGalleryView();
  });

  test("02.02.002 - When I open a task on List Workflow Mode, Then I see task details ", async ({
    page,
  }) => {
    //act
    //TODO: (to check when this screen should be displayed)
    //await taskPage.whenIclickOnReadyToGoButton();
    await taskPage.whenICreateAtask();
    await taskPage.whenIOpenTaskCreated();

    //assert
    await taskPage.assertTaksDetails();
  });
});
