import { type Locator, type Page, expect } from '@playwright/test';
import testData from '../../../utils/testData.json';

export class TaskPage{
 
  readonly page: Page;

    /*---------------------------------------------VARIABLES--------------------------------------------------*/



    /*----------------------------------------SECTION NAME LOCATORS-------------------------------------------*/
    
    readonly BTN_READYTOGO_TASKPAGE: Locator;
    readonly BTN_ADDTASK_TASKPAGE: Locator;
    readonly BTN_BACK_TASKPAGE: Locator;
    readonly BTN_DELETETASK_TASKPAGE: Locator;
    readonly BTN_TOOGLEVIEWMODE_TASKPAGE : Locator;
    readonly BTN_ASSIGNEDTOMENBER_TASKPAGE: Locator;

    readonly DPD_TASKTYPE_TASKPAGE: Locator;
    readonly LST_TODOTASKTYPE_TASKPAGE: Locator;
    readonly FLD_TASKNAME_TASKPAGE: Locator;
    readonly FLD_DESCRIPTION_TASKPAGE: Locator;
    readonly FLD_COMMENTS_TASKPAGE: Locator;
    readonly FLD_TAGS_TASKPAGE: Locator;
    
    readonly TXT_HELLO_TASKPAGE: Locator;
    readonly TXT_LUISGUERRAASSINEE_TASKPAGE: Locator;
    readonly TXT_TYPECREATED_TASKPAGE: Locator;
    readonly TXT_NAMECREATED_TASKPAGE: Locator;
    readonly TXT_DESCRIPTIONCREATED_TASKPAGE: Locator;
    readonly TXT_AUTHORCREATED_TASKPAGE: Locator;
    readonly TXT_CALENDAR_MONTH_TASKPAGE: Locator;
    readonly TXT_TAGCREATED_TASKPAGE: Locator;
    readonly LNK_TASKBANNER_TASKPAGE: Locator;

    readonly ICN_PYD_SHOWTASK_ONTOP_TASKPAGE: Locator;
    readonly ICN_PYD_CLOSE_ONTOP_TASKPAGE: Locator;

    /*----------------------------------------SECTION ELEMENT LOCATORS-----------------------------------------*/
    constructor (page: Page) {
      this.page = page;
      this.BTN_READYTOGO_TASKPAGE = page.getByText('Ready to Go');
      this.BTN_ADDTASK_TASKPAGE = page.locator('a[ng-click="createTask()"]');
      this.BTN_ASSIGNEDTOMENBER_TASKPAGE = page.locator('.assign-actions > .avatar');
      this.BTN_BACK_TASKPAGE = page.locator('.back-button');
      this.BTN_DELETETASK_TASKPAGE = page.locator('ng-include').getByRole('article').getByTitle('Delete');
      this.BTN_TOOGLEVIEWMODE_TASKPAGE = page.locator('a[title="Toggle between display modes"] span');

      this.DPD_TASKTYPE_TASKPAGE = page.getByText('Todo').first();
      this.LST_TODOTASKTYPE_TASKPAGE = page.locator('a').filter({ hasText: /^Todo$/ });
      this.FLD_TASKNAME_TASKPAGE = page.getByPlaceholder('INSERT TASK NAME');
      this.FLD_DESCRIPTION_TASKPAGE = page.getByPlaceholder('INSERT DESCRIPTION')
      this.FLD_COMMENTS_TASKPAGE = page.getByPlaceholder('Insert comment...');
      this.FLD_TAGS_TASKPAGE = page.getByPlaceholder('ADD TAGS');

      this.TXT_HELLO_TASKPAGE = page.locator('ng-include div').filter({ hasText: 'Hello Luis Guerra!' }).nth(4);
      this.TXT_LUISGUERRAASSINEE_TASKPAGE = page.getByText('Luis Guerra RF Engineer').first();
      this.TXT_TYPECREATED_TASKPAGE = page.locator('span.type', { hasText: 'Todo' }).first();
      this.TXT_NAMECREATED_TASKPAGE = page.locator('span.title', { hasText: 'QA task name' }).first();
      this.TXT_DESCRIPTIONCREATED_TASKPAGE = page.locator('span.description', { hasText: 'QA description' }).first();
      this.TXT_AUTHORCREATED_TASKPAGE = page.locator('span.author-name', { hasText: 'Luis Guerra' }).first();
      this.TXT_CALENDAR_MONTH_TASKPAGE = page.getByText('Jan');
      this.TXT_TAGCREATED_TASKPAGE = page.getByText('QAtag');

      this.LNK_TASKBANNER_TASKPAGE = page.locator('a.click-element').nth(0);

      this.ICN_PYD_SHOWTASK_ONTOP_TASKPAGE = page.locator('a[ng-click="tasksPYDController.enablePYD(true)"]');
      this.ICN_PYD_CLOSE_ONTOP_TASKPAGE = page.locator('.close-pyd');
    }

    /*-----------------------------------------SECTION PAGE ACTIONS-------------------------------------------*/
    
    async assertHelloMessageIsDisplayedOnFistTaskAccess() {
        await expect(this.TXT_HELLO_TASKPAGE).toBeVisible();
        await expect(this.BTN_READYTOGO_TASKPAGE).toBeVisible();
    }

    async whenIClickOnReadyToGoButton() {
        await this.BTN_READYTOGO_TASKPAGE.click();
    }
    async whenICreateAtask() {
      await this.BTN_ADDTASK_TASKPAGE.click();
      await this.DPD_TASKTYPE_TASKPAGE.hover();
      await this.LST_TODOTASKTYPE_TASKPAGE.click();

      await this.FLD_TASKNAME_TASKPAGE.fill('QA task name');
      await this.FLD_DESCRIPTION_TASKPAGE.fill('QA description');
      await this.FLD_COMMENTS_TASKPAGE.fill('QA commment');

      await this.BTN_ASSIGNEDTOMENBER_TASKPAGE.click();
      await this.TXT_LUISGUERRAASSINEE_TASKPAGE.click(); 

      await this.FLD_TAGS_TASKPAGE.type('QAtest');
      await this.page.waitForTimeout(500);
      await this.FLD_TAGS_TASKPAGE.press('Enter');
      await this.page.waitForTimeout(500);
  
      await this.BTN_BACK_TASKPAGE.click();
    }
    async whenIclickOnToggleTochageTaskView(){
      await this.BTN_TOOGLEVIEWMODE_TASKPAGE.click();
    }
    async assertTaksWasCreatedAndVisibleOnListView() {
      // to check that it's a list that have task visible
      await expect(this.TXT_CALENDAR_MONTH_TASKPAGE).not.toBeVisible();

      await expect(this.TXT_TYPECREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_NAMECREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_DESCRIPTIONCREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_AUTHORCREATED_TASKPAGE).toBeVisible();
    }

    async assertTaksWasCreatedAndVisibleOnCalendarView() {
      // to check that it's a calendar that have task visible
      await expect(this.TXT_CALENDAR_MONTH_TASKPAGE).toBeVisible();

      await expect(this.TXT_TYPECREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_NAMECREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_DESCRIPTIONCREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_AUTHORCREATED_TASKPAGE).toBeVisible();
    }

    async assertTaksWasCreatedAndHiddedByGalleryView() {
      // to check that it's a gallary that have task details hidded by default
      await expect(this.TXT_CALENDAR_MONTH_TASKPAGE).not.toBeVisible();

      await expect(this.TXT_TYPECREATED_TASKPAGE).not.toBeVisible();
      await expect(this.TXT_NAMECREATED_TASKPAGE).not.toBeVisible();
      await expect(this.TXT_DESCRIPTIONCREATED_TASKPAGE).not.toBeVisible();
      await expect(this.TXT_AUTHORCREATED_TASKPAGE).not.toBeVisible();
    }
    async whenIRollbackToTaksList(){
      await this.BTN_BACK_TASKPAGE.click();
    }

    async whenIDeleteAtaskVisibleOnList() {
      await this.ICN_PYD_SHOWTASK_ONTOP_TASKPAGE.click();
      await this.BTN_DELETETASK_TASKPAGE.click();
      await this.BTN_DELETETASK_TASKPAGE.click({force: true});
      await this.ICN_PYD_CLOSE_ONTOP_TASKPAGE.waitFor({state: 'hidden', timeout: 30000});
    }

    async whenIOpenTaskCreated() {
      await this.LNK_TASKBANNER_TASKPAGE.click();
    }

    async assertTaksDetails(){
      await expect(this.TXT_TYPECREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_NAMECREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_DESCRIPTIONCREATED_TASKPAGE).toBeVisible();
      await expect(this.TXT_AUTHORCREATED_TASKPAGE).toBeVisible();

      //TODO: Issue to add tag (metric display erro message during task creation)
      //await expect(this.TXT_TAGCREATED_TASKPAGE).toBeVisible();
    }
}

export default TaskPage;

