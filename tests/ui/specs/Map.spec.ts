import { test, expect } from "@playwright/test";
import CommonSessionsPage from "../pages/common-sessions-page";
import MapPage from "../pages/map-page";
import AccessPage from "../pages/access-page";
import testData from "../../../utils/testData.json";

let mapPage: MapPage;
let accessPage: AccessPage;
let commonSessionsPage: CommonSessionsPage;

test.beforeEach(async ({ page }) => {
  const URL = testData.endpoints.baseUrl;
  await page.goto(URL);
  mapPage = new MapPage(page);
  accessPage = new AccessPage(page);
  commonSessionsPage = new CommonSessionsPage(page);

  await accessPage.whenIGoToLoginForm();
  await accessPage.whenILoginWithLuis(
    testData.validLoginTest.email,
    testData.validLoginTest.password
  );
  await commonSessionsPage.whenIClickOnMapTap();
});

test.afterEach(async ({ page }) => {
  //await page.close();
});

test.describe("Scenario 01: Search and Check Legend", () => {
  test("05.01.001 - When I search Crossed Sectors test, Then I see Map legend updated", async ({
    page,
  }) => {
    //act
    await mapPage.whenITypeCrossedSectors();

    //assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
    await mapPage.assertLegendIsNotEmpty(
      page,
      testData.legendDivClass,
      testData.legendTitle.crossSectors
    );
  });

  test("05.01.002 - When I search for `DT KPI 4G` to select `RSRP`, Then I see Map legend updated", async ({
    page,
  }) => {
    //act
    await mapPage.whenITypeDTKPI4G();

    //assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
    await mapPage.assertLegendIsNotEmpty(
      page,
      testData.legendDivClass,
      testData.legendTitle.RSRP
    );
  });

  test("05.01.003 - When I search `DT KPI 4G` to select `RSRP` and I search for `mobile`, Then I see Map legend updated", async ({
    page,
  }) => {
    //act
    await mapPage.whenIInformInitialDateAndEndDate("20210101", "20240101");
    await mapPage.whenITypeDTKPI4G();
    await mapPage.whenISelectTheFirstMobile();

    //assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
    await mapPage.assertLegendIsNotEmpty(
      page,
      testData.legendDivClass,
      testData.legendTitle.RSRP
    );
  });

  test("05.01.004 - When I search `DT KPI 4G` and I select `RSRP` and I search for `Operator` and I select `Unitel`, Then I should see the legend updated with the search results", async ({
    page,
  }) => {
    //act
    await mapPage.whenITypeDTKPI4G();
    await mapPage.whenISearchForOperatorUnitel();

    //assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
    await mapPage.assertLegendIsNotEmpty(
      page,
      testData.legendDivClass,
      testData.legendTitle.RSRP
    );
  });
});

test.describe("Scenario 02: Search and Check Growl", () => {
  test("05.02.001 - When I search for `Cells` and I export the map to JPEG, Then I should see the growl message confirming the export", async ({
    page,
  }) => {
    //act
    await mapPage.whenITypeCells();
    await mapPage.whenIExportAsJPeg();

    //assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
    await mapPage.AssertExportIsSuccessful(page);
  });

  test("05.02.002 - When I search `Overshooting cells`, Then I should see the growl messages with search results", async ({
    page,
  }) => {
    //act
    await mapPage.whenISearchForOvershootingCells();

    //assert
    await mapPage.AssertOvershootCells(page);
  });

  test("05.02.003 - When I search `Export to JPEG` and I select `This Screen Only`, Then I should see the growl message confirming the export", async ({
    page,
  }) => {
    //act
    await mapPage.whenITypeDTKPI4G();
    await mapPage.whenIExportAsJPeg();

    //assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
    await mapPage.AssertExportIsSuccessful(page);
  });
});

test.describe("Scenario 03: Search and Check Tags", () => {
  test('05.03.001 -The search input should be empty at this point. Search for "RANDOM". One of the options should be "Tags" with one entry for the "RANDOM" tag. Select it.', async ({
    page,
  }) => {
    //act
    await mapPage.whenITypeRandom();

    //assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
    await mapPage.assertRandomTag();
    await mapPage.assertRandomPickedTag();
  });
});

test.describe("Scenario 04: Search and Generic Info", () => {
  test('05.04.001 -Request the DT Generic Info Path. - "DT Generic Info="path" > validate map legend.', async ({
    page,
  }) => {
    //act
    await mapPage.whenITypeGenericInfoPath();

    //assert
    await commonSessionsPage.assertPageUrlEndpointIs(testData.endpoints.hall);
    await mapPage.assertLegendIsNotEmpty(
      page,
      testData.legendDivClass,
      testData.legendTitle.PATH
    );
  });
});
