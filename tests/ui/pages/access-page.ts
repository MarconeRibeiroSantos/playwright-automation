import { type Locator, type Page, expect } from '@playwright/test';
import testData from '../../../utils/testData.json';

export class AccessPage{
 
   readonly page: Page;

    /*---------------------------------------------VARIABLES--------------------------------------------------*/
    readonly baseUrl: string = 'https://unitel-dev.metric.pt/';

    readonly txt_visionary_title: string = 'BEING A VISIONARY IS TO QUESTION THE UNQUESTIONABLE';
    readonly txt_welcome_description: string = 'Welcome to a new vision of managing telecommunication networks, a vision where projects are shared, performance data flows freely and collaboration just happens.';
    readonly txt_areyouvisionary_button: string = 'Are you a visionary?';
    readonly txt_userloggedin: string = 'Luis Guerra';
    readonly txt_loginerror_message: string = 'Error while logging in.';
    readonly txt_loginRequiredFieldsError_message: string = 'This field is required.';
    readonly txt_planyourday_message: string = 'Take a minute to plan your day.';
    
    /*----------------------------------------SECTION NAME LOCATORS-------------------------------------------*/
    
    readonly BTN_GOTOLOGIN_ACCESSPAGE: Locator;
    readonly BTN_LOGIN_ACCESSPAGE: Locator;

    readonly FLD_USERNAME_ACCESSPAGE: Locator;
    readonly FLD_PASSWORD_ACCESSPAGE: Locator;
    
    readonly TXT_USERLOGGEDIN_ACCESSPAGE: Locator;
    readonly TXT_LOGINERRORMESSAGE_ACCESSPAGE: Locator;
    readonly TXT_LOGINREQUIREDFIELDS_ACCESSPAGE: Locator;
    readonly TXT_HELLOLUISMESSAGE_ACCESSPAGE: Locator;
    readonly TXT_PLANYOURDAYMESSAGE_ACCESSPAGE: Locator;

    readonly TXT_NEWSCARD_HOMEPAGE: Locator;
    readonly TXT_ORANGETITILE_NEWSPAGE: Locator;
    readonly TXT_LAUNCHES_LIST_NEWSPAGE: Locator;
    readonly TXT_LAUNCHTITLE_NEWSPAGE: Locator;

    /*----------------------------------------SECTION ELEMENT LOCATORS-----------------------------------------*/
    constructor (page: Page) {
        this.page = page;

        //TODO: Access page, let the right one
        //old access page
        this.BTN_GOTOLOGIN_ACCESSPAGE =  page.getByRole('link', { name: 'Log In' });
        this.BTN_LOGIN_ACCESSPAGE = page.getByRole('button', { name: 'Log In' });
        //new access page
        //this.BTN_GOTOLOGIN_ACCESSPAGE =  page.getByRole('button', { name: 'Login' });
        //this.BTN_LOGIN_ACCESSPAGE = page.getByRole('button', { name: 'LOG IN' });

        this.FLD_USERNAME_ACCESSPAGE = page.getByPlaceholder('Username');
        this.FLD_PASSWORD_ACCESSPAGE = page.getByPlaceholder('Password');
        
        this.TXT_USERLOGGEDIN_ACCESSPAGE = page.locator('a.user span.user-name', { hasText: this.txt_userloggedin});
        this.TXT_LOGINERRORMESSAGE_ACCESSPAGE = page.getByText(this.txt_loginerror_message, { exact: true });
        this.TXT_LOGINREQUIREDFIELDS_ACCESSPAGE = page.getByText(this.txt_loginRequiredFieldsError_message, { exact: true });
        this.TXT_HELLOLUISMESSAGE_ACCESSPAGE = page.getByText('Hello Luis Guerra!')
        this.TXT_PLANYOURDAYMESSAGE_ACCESSPAGE = page.getByText(this.txt_planyourday_message, { exact: true });

        this.TXT_NEWSCARD_HOMEPAGE = page.getByText('News');
        this.TXT_ORANGETITILE_NEWSPAGE = page.getByRole('heading', { name: 'Orange pushes 4G-powered PTT' });
        this.TXT_LAUNCHES_LIST_NEWSPAGE = page.getByText('EE launches anti-scam').first();
        this.TXT_LAUNCHTITLE_NEWSPAGE = page.getByRole('heading', { name: 'EE launches anti-scam' });
    }

    /*-----------------------------------------SECTION PAGE ACTIONS-------------------------------------------*/
    
    async whenISubmitLoginForm(){
        await this.BTN_LOGIN_ACCESSPAGE.click();
        //TODO: Remove 2x click after bug fix
        await this.BTN_LOGIN_ACCESSPAGE.waitFor();
        await this.BTN_LOGIN_ACCESSPAGE.click();
    }

    async whenIGoToLoginForm(){
        await this.BTN_GOTOLOGIN_ACCESSPAGE.click();
    }

    async whenIFillInEmailAndPassword(email: string, password: string){
        await this.FLD_USERNAME_ACCESSPAGE.fill(email);
        await this.FLD_PASSWORD_ACCESSPAGE.fill(password);
    }
    
    async whenItryToLogin(email: string, password: string) {
        await this.whenIFillInEmailAndPassword(email, password)
        await this.whenISubmitLoginForm();
    }

    async whenILoginWithLuis(email: string, password: string) {
        await this.whenIFillInEmailAndPassword(email, password)
        await this.whenISubmitLoginForm();
        await this.waitLoginPageLoad(testData.validLoginTest.name);
    }

    async waitLoginPageLoad(userName: string) {
        await this.page.waitForSelector(`text=${userName}`);
    }

    async assertUserNameLoggedIn() {
        await this.waitLoginPageLoad(testData.validLoginTest.name);
        await expect(this.TXT_USERLOGGEDIN_ACCESSPAGE).toBeVisible();
    }
    async assertHelloMessageIsVisible() { //Defect: it fails sometime because the page don't display this info
        await this.waitLoginPageLoad(testData.validLoginTest.name);
        await expect(this.TXT_HELLOLUISMESSAGE_ACCESSPAGE).toBeVisible();
        await expect(this.TXT_PLANYOURDAYMESSAGE_ACCESSPAGE).toBeVisible();
    }

    async assertLoginErrorMessage() {
        await expect(this.TXT_LOGINERRORMESSAGE_ACCESSPAGE).toBeVisible();
    }
    
    async assertUsernameAndPasswordPlaceholderIsVisible() {
        await expect(this.FLD_USERNAME_ACCESSPAGE).toBeVisible();
        await expect(this.FLD_PASSWORD_ACCESSPAGE).toBeVisible();
    }

    async assertRequiredMessageErrorIsVisible(){
        await expect(this.TXT_LOGINREQUIREDFIELDS_ACCESSPAGE).toBeVisible();
    }

    async assertLoginButtonIsVisible() { 
        await expect(this.BTN_GOTOLOGIN_ACCESSPAGE).toBeVisible();
    }

    async whenIClickOnNewsCard(){
        await this.TXT_NEWSCARD_HOMEPAGE.click();
    }

    async whenISelecAcardOnScrollList(){
        await this.TXT_LAUNCHES_LIST_NEWSPAGE.click();
    }
    
    //assert 
    async assertNewsContentWasChanged(){
        await expect(this.TXT_ORANGETITILE_NEWSPAGE).not.toBeVisible(); //not visible Orange
        await expect(this.TXT_LAUNCHTITLE_NEWSPAGE).toBeVisible(); //visible: EE
    }

}

export default AccessPage;

