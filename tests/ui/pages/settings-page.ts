import { type Locator, type Page, expect } from '@playwright/test';
import testData from '../../../utils/testData.json';

export class SettingsPage{
 
  readonly page: Page;

    /*---------------------------------------------VARIABLES--------------------------------------------------*/



    /*----------------------------------------SECTION NAME LOCATORS-------------------------------------------*/
    
    readonly FILE_INPUTFIELD_SETTINGS: Locator;
    readonly BTN_RESIZE_SETTINGS: Locator;
    readonly BTN_CONFIRMUPLOAD_SETTINGS: Locator;
    readonly TXT_UPLOADSUCCESSMESSAGE_SETTINGS: Locator;

    /*----------------------------------------SECTION ELEMENT LOCATORS-----------------------------------------*/
    constructor (page: Page) {
      this.page = page;

      this.FILE_INPUTFIELD_SETTINGS = page.locator('input#imageInput');
      this.BTN_RESIZE_SETTINGS = page.locator('canvas');
      this.BTN_CONFIRMUPLOAD_SETTINGS = page.locator('snapper-drawer-sidebar a').nth(1);
      this.TXT_UPLOADSUCCESSMESSAGE_SETTINGS = page.getByText('Image successfully updated');
    }

    /*-----------------------------------------SECTION PAGE ACTIONS-------------------------------------------*/
          //act
      // imput image locator('#imageInput')
      
      async whenIUploadProfilePicture(){
        await this.FILE_INPUTFIELD_SETTINGS.setInputFiles('utils/resources/img_file_to_upload.png');
      }
      
      //assert
      async assertResizeOptionIsAvailable(){
        await expect(this.BTN_RESIZE_SETTINGS).toBeVisible();
      }

      async whenIClickOnConfirmButton(){
        await this.BTN_CONFIRMUPLOAD_SETTINGS.click();
      }

      async assertPictureWasUpdated(){
        await expect(this.TXT_UPLOADSUCCESSMESSAGE_SETTINGS).toHaveText('Image successfully updated.');
      }
}

export default SettingsPage;

