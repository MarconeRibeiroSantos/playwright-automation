import { type Locator, type Page, expect } from '@playwright/test';
import testData from '../../../utils/testData.json';

export class MapPage{
 
   readonly page: Page;

    /*---------------------------------------------VARIABLES--------------------------------------------------*/



    /*----------------------------------------SECTION NAME LOCATORS-------------------------------------------*/
    
    readonly FLD_DATE_INIT_MAPPAGE: Locator;
    readonly FLD_DATE_END_MAPPAGE: Locator;
    readonly FLD_SEARCHFIRST_MAPPAGE: Locator;
    readonly TAG_SEARCHRESULT_MAPPAGE: Locator;
    readonly TAG_RSRP_MAPPAGE: Locator;
    readonly TAG_RSRP_STRONGEST_MAPPAGE: Locator;
    readonly TAG_RSRP_STRONGEST_20DB_MAPPAGE: Locator;
    readonly TAG_CROSSED_SECTORS_MAPPAGE: Locator;
    readonly TAG_CROSSED_SECTORS_FIRST_ELEMENT_MAPPAGE: Locator;
    readonly EDIT_LEGEND_BTN_MAPPAGE: Locator;
    readonly EDIT_LEGEND_NUMBER_ELEMENTS_MAPPAGE: Locator;
    readonly EDIT_LEGEND_APPLY_TO_SESSION_BTN_MAPPAGE: Locator;
    readonly TAG_DT_KPI_4G_MAPPAGE: Locator;
    readonly TAG_DT_KPI_4G_RSRP_MAPPAGE: Locator;
    readonly TAG_DT_KPI_4G_RSRP_UE_MAPPAGE: Locator;
    readonly TAG_DT_KPI_4G_RSRP_OPERATOR_UNITEL_MAPPAGE: Locator;
    readonly TAG_DT_KPI_4G_RSRP_MOBILE_MAPPAGE: Locator;
    readonly TAG_DT_KPI_4G_RSRP_EXPORT_JPEG_MAPPAGE: Locator;
    readonly TAG_DT_KPI_4G_RSRP_THIS_SCREEN_ONLY_MAPPAGE: Locator;
    readonly TAG_OVERSHOOTING_CELLS_MAPPAGE: Locator;
    readonly TAG_RANDOM_MAPPAGE: Locator;
    readonly TAG_RANDOM_PICKED_MAPPAGE: Locator;
    readonly TAG_GENERIC_INFO_MAPPAGE: Locator;
    readonly TAG_PATH_MAPPAGE: Locator;

    /*----------------------------------------SECTION ELEMENT LOCATORS-----------------------------------------*/
    constructor (page: Page) {
        const searchFirstText = 'Type here any topic to display';
        this.page = page;       
        this.FLD_DATE_INIT_MAPPAGE = page.getByPlaceholder('YYYY-MM-DD').first();
        this.FLD_DATE_END_MAPPAGE = page.getByPlaceholder('YYYY-MM-DD').nth(1);
        this.FLD_SEARCHFIRST_MAPPAGE =  page.getByPlaceholder(searchFirstText);
        this.TAG_RSRP_MAPPAGE = page.locator('div').filter({ hasText: /^RSRP$/ }).first();
        this.TAG_RSRP_STRONGEST_MAPPAGE = page.getByText('Strongest RSRP -');
        this.TAG_RSRP_STRONGEST_20DB_MAPPAGE = page.getByText('[SC]Strongest RSRP - 20 dB');
        this.TAG_CROSSED_SECTORS_MAPPAGE = page.locator('div').filter({ hasText: /^Crossed Sectors$/ });
        this.TAG_CROSSED_SECTORS_FIRST_ELEMENT_MAPPAGE = page.locator('.sidebar-list-element').first();
        this.EDIT_LEGEND_BTN_MAPPAGE = page.getByTitle('Edit legend');
        this.EDIT_LEGEND_NUMBER_ELEMENTS_MAPPAGE = page.getByRole('textbox', { name: 'Number of themes' });
        this.EDIT_LEGEND_APPLY_TO_SESSION_BTN_MAPPAGE = page.getByText('Apply To Session');
        this.TAG_DT_KPI_4G_MAPPAGE = page.locator('div').filter({ hasText: /^DT KPI 4G="$/ });
        this.TAG_DT_KPI_4G_RSRP_MAPPAGE=page.getByText('RSRP', { exact: true })
        this.TAG_DT_KPI_4G_RSRP_UE_MAPPAGE = page.getByText('[UE]RSRP');
        this.TAG_DT_KPI_4G_RSRP_OPERATOR_UNITEL_MAPPAGE = page.getByText('Unitel', { exact: true });
        this.TAG_DT_KPI_4G_RSRP_MOBILE_MAPPAGE=page.locator('div.tt-dataset.tt-dataset-mobilesSource');
        this.TAG_DT_KPI_4G_RSRP_EXPORT_JPEG_MAPPAGE=page.getByText('Export to JPEG="');
        this.TAG_DT_KPI_4G_RSRP_THIS_SCREEN_ONLY_MAPPAGE=page.getByText('This Screen Only');
        this.TAG_OVERSHOOTING_CELLS_MAPPAGE = page.locator('div').filter({ hasText: /^Overshooting Cells$/ });
        this.TAG_RANDOM_MAPPAGE = page.getByText('Tag="random"');
        this.TAG_RANDOM_PICKED_MAPPAGE = page.getByText('Tag="random"');
        this.TAG_GENERIC_INFO_MAPPAGE = page.getByText('DT Generic Info="');
        this.TAG_PATH_MAPPAGE = page.getByText('Path', { exact: true });

        
    }

    /*-----------------------------------------SECTION PAGE ACTIONS-------------------------------------------*/
    
    async whenISearchOnMainMapFieldTypingAllTagName(completeTagNameToFill: string){
        await this.FLD_SEARCHFIRST_MAPPAGE.fill(completeTagNameToFill);
    }
    async whenISearchOnMainMapFieldTypingPartOfTagName(partTagNameToFill: string) {
        await this.FLD_SEARCHFIRST_MAPPAGE.type(partTagNameToFill);
    }

    async whenIInformInitialDateAndEndDate(initDateYYYYMMDD: string, endDateYYYYMMDD: string) {
        await this.FLD_DATE_INIT_MAPPAGE.type(initDateYYYYMMDD);
        await this.FLD_DATE_END_MAPPAGE.type(endDateYYYYMMDD);
    }

    async assertLegendIsNotEmpty(page: Page, legendSelector: string, legendTitle: string){
        try {
            // Locate elements matching the selector 
            const legendLocators = await page.locator(`${legendSelector}`).filter({ hasText: legendTitle });
            await legendLocators.nth(0).waitFor({ state: 'visible', timeout: 50000 });

            // Ensure that at least one element matches the criteria
            if (await legendLocators.count() === 0) {
                throw new Error(`Assertion failed: No legend elements found.`);
            }
    
            // Iterate through each element and perform assertion
            let assertionPassed = false;
          
            const legendText = await legendLocators?.nth(0).innerText();
            const percentages = legendText.match(/\((\d+\.?\d*)%\)/g)?.map(match => parseFloat(match.slice(1, -2)));
            if (percentages?.some(value => value > 0)) {
                assertionPassed = true;
            }
   
            // Throw error if no element passed the assertion
            if (!assertionPassed) {
                throw new Error(`Assertion failed: All legends are empty or all percentages are zero.`);
            }
    
            expect(true).toBe(true);
        } catch (error) {
            console.error(error);
            expect(false).toBe(true);
        }
    }


    async assertLegendEditSuccess(page: Page, legendSelector: string, legendTitle: string){
        try {
            // Locate elements matching the selector 
            const legendLocators = await page.locator(`${legendSelector}`).filter({ hasText: legendTitle });
            await legendLocators.nth(0).waitFor({ state: 'visible', timeout: 50000 });
            // Ensure that at least one element matches the criteria
            if (await legendLocators.count() === 0) {
                throw new Error(`Assertion failed: No legend elements found with text starting with 'All' for selector.`);
            }
    
            let assertionPassed = false;
            const count = await legendLocators.count();

            await this.whenIRemoveAnElement();

            const legendLocatorsDiff = await page.locator(`${legendSelector}`).filter({ hasText: legendTitle }).nth(0); 
            const countDiff = await legendLocatorsDiff.count();  
            if (count - 1 === countDiff) {
                    assertionPassed = true;
                }
            // Throw error if no element passed the assertion
            if (!assertionPassed) {
                throw new Error(`Assertion failed.`);
            }
    
            expect(true).toBe(true);
        } catch (error) {
            console.error(error);
            expect(false).toBe(true);
        }
    }

    async whenITypeCrossedSectors() {
        await this.whenISearchOnMainMapFieldTypingAllTagName('Crossed Sectors');
        await this.TAG_CROSSED_SECTORS_MAPPAGE.click();
        await this.TAG_CROSSED_SECTORS_FIRST_ELEMENT_MAPPAGE.click();
    }

    async whenIRemoveAnElement(){
        await this.EDIT_LEGEND_BTN_MAPPAGE.click();
        await this.whenIRemoveElementFromLegend();
        await this.EDIT_LEGEND_APPLY_TO_SESSION_BTN_MAPPAGE.click();
    }

    async whenIRemoveElementFromLegend() {
        try {
            // Get the current value from the textbox
            const value = await this.EDIT_LEGEND_NUMBER_ELEMENTS_MAPPAGE.inputValue();
            
            // Convert the value to a number
            const currentNumber = parseInt(value, 10);
            
            // Subtract 1 from the current number
            const newNumber = currentNumber - 1;
            
            // Set the new value in the textbox
            await this.EDIT_LEGEND_NUMBER_ELEMENTS_MAPPAGE.fill(newNumber.toString());

        } catch (error) {
            console.error(`Error removing an element from the legend: ${error}`);
        }
    }
    async whenITypeCells(){
        await this.whenISearchOnMainMapFieldTypingAllTagName('Cells');
    }
    async whenITypeDTKPI4G(){
        await this.whenISearchOnMainMapFieldTypingAllTagName('DT KPI 4G=');
        await this.TAG_DT_KPI_4G_MAPPAGE.click();
        await this.TAG_DT_KPI_4G_RSRP_MAPPAGE.click();
        await this.TAG_DT_KPI_4G_RSRP_UE_MAPPAGE.click();

    }

    async whenISearchForOperatorUnitel(){
        await this.whenISearchOnMainMapFieldTypingAllTagName('Operator=');
        await this.TAG_DT_KPI_4G_RSRP_OPERATOR_UNITEL_MAPPAGE.click();
    }

    async whenISelectTheFirstMobile(){
        await this.whenISearchOnMainMapFieldTypingPartOfTagName('Mobile');
        await this.TAG_DT_KPI_4G_RSRP_MOBILE_MAPPAGE.locator('div.tt-suggestion.tt-selectable').first().click();
    }

    async whenIExportAsJPeg(){
        await this.whenISearchOnMainMapFieldTypingPartOfTagName('Export to JPEG=');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await this.TAG_DT_KPI_4G_RSRP_EXPORT_JPEG_MAPPAGE.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        await this.TAG_DT_KPI_4G_RSRP_THIS_SCREEN_ONLY_MAPPAGE.click();
    }

    async AssertExportIsSuccessful(page: Page) {
        const textPattern = /×\dData exported/;
        try {
            // Wait for the element to appear with a max timeout
            await page.waitForFunction((pattern) => {
                const growlContainer = document.querySelector('.growl-container.growl-fixed.top-right');
                if (!growlContainer) return false;
                const messages = Array.from(growlContainer.querySelectorAll('div'));
                return messages.some(msg => pattern.test(msg.textContent || ''));
            }, textPattern, { timeout: 100000 });
            expect(true).toBeTruthy(); // Assert success
        } catch (error) {
            expect(false).toBeTruthy(); // Assert failure
        }
    }

    async AssertOvershootCells(page: Page) {   
        try {
            let isAnyAssertionTrue = false;
            const textPattern = /There aren't overshooting cells\./;
    
            try {
                await page.waitForFunction((pattern) => {
                    const growlContainer = document.querySelector('.growl-item.alert.alert-error.alert-danger.alert-dismissable');
                    if (!growlContainer) return false;
                    const messages = Array.from(growlContainer.querySelectorAll('div'));
                    return messages.some(msg => pattern.test(msg.textContent || ''));
                }, textPattern, { timeout: 5000 });
    
                // If the function completes without timing out, set isAnyAssertionTrue to true
                isAnyAssertionTrue = true;
    
            } catch (timeoutError) {
                // If the waitForFunction times out, it will throw an error which we catch here.
                console.log('Growl message not found within timeout, proceeding to check nano-content.');
            }
    
            if (!isAnyAssertionTrue) {
                // Check if the div with the class nano-content has elements
                const nanoContentSelector = '.nano-content';
                const hasElements = await page.$eval(nanoContentSelector, (nanoContent) => {
                    return nanoContent.children.length > 0;
                });
    
                if (hasElements) {
                    isAnyAssertionTrue = true;
                }
            }
    
            // Assert that at least one of the conditions is true
            expect(isAnyAssertionTrue).toBeTruthy(); 
    
        } catch (error) {
            console.error(error);
            expect(false).toBeTruthy(); // Assert failure
        }
    }
    

    async whenISearchForOvershootingCells(){
        await this.whenISearchOnMainMapFieldTypingAllTagName('Overshooting Cells');
        await this.TAG_OVERSHOOTING_CELLS_MAPPAGE.click();
    }


    async assertRandomPickedTag(){
        await expect(this.TAG_RANDOM_PICKED_MAPPAGE).toBeVisible();
    }

    async assertRandomTag(){
        await expect(this.TAG_RANDOM_MAPPAGE).toBeEnabled(); 
        await expect(this.TAG_RANDOM_MAPPAGE).toBeVisible();
    }

    async whenITypeRandom(){
        await this.whenISearchOnMainMapFieldTypingAllTagName('random');
        await this.TAG_RANDOM_MAPPAGE.click();
    }

    async whenITypeGenericInfoPath(){
        await this.whenISearchOnMainMapFieldTypingAllTagName('DT Generic Info='); 
        await this.TAG_GENERIC_INFO_MAPPAGE.click();
        await this.TAG_PATH_MAPPAGE.click();
    }
    
}

export default MapPage;

