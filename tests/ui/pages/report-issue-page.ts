import { type Locator, type Page, expect } from '@playwright/test';
import testData from '../../../utils/testData.json';

export class ReportIssuePage{
 
   readonly page: Page;

    /*---------------------------------------------VARIABLES--------------------------------------------------*/



    /*----------------------------------------SECTION NAME LOCATORS-------------------------------------------*/
    readonly FLD_SUBJECT_REPORTISSUE: Locator;
    readonly FLD_DESCRIPTION_REPORTISSUE: Locator;
    readonly TXT_CREATEDGROWLMESSAGE_REPORTISSUE: Locator;
  

    /*----------------------------------------SECTION ELEMENT LOCATORS-----------------------------------------*/
    constructor (page: Page) {
        this.page = page;
        this.FLD_SUBJECT_REPORTISSUE = page.getByPlaceholder('INSERT ISSUE SUBJECT');
        this.FLD_DESCRIPTION_REPORTISSUE = page.getByPlaceholder('INSERT DESCRIPTION');
        this.TXT_CREATEDGROWLMESSAGE_REPORTISSUE = page.getByText('Issue Created');
    }

    /*-----------------------------------------SECTION PAGE ACTIONS-------------------------------------------*/
    async whenIEnterReportIssueDetails(){
        await this.FLD_SUBJECT_REPORTISSUE.type('QA subject')
        await this.FLD_DESCRIPTION_REPORTISSUE.type('QA description')
    }

    async assertGrowlMessageIsDisplayed(){
        await expect(this.TXT_CREATEDGROWLMESSAGE_REPORTISSUE).toBeVisible();
    }

}

export default ReportIssuePage;

