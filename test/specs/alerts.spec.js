const AlertPage = require('../pageobjects/alert.page');
const PageHelper = require('../helperfiles/page.helper');
describe('Alert handling tests', () => {
    it('alert should display on button click', async () => {
        // Navigating to alert test page
        await AlertPage.goToPage();

        // Clicking alert button
        await AlertPage.alertButton.click();

        // Verifying alert displayed
        const isAlertOpen = await browser.isAlertOpen();
        expect(isAlertOpen).toBe(true);

        // Verifying alert text to be 'You clicked a button'
        expect(await browser.getAlertText()).toBe(
            AlertPage.alertTexts.alertText,
        );

        // Closing alert
        await PageHelper.acceptAlert();
    });

    it('alert should display after 5 seconds', async () => {
        // Clicking delayed alert button
        await AlertPage.timerAlertButton.click();

        // Verifying alert is not displayed
        expect(await browser.isAlertOpen()).toBe(false);

        // Waiting for 5 seconds and verifying alert is displayed
        expect(await browser.isAlertOpen()).toBe(true);

        // Verifying alert text to be 'This alert appeared after 5 seconds'
        const alertText = await browser.getAlertText();
        expect(alertText).toBe(AlertPage.alertTexts.timerAlertText);

        // Closing alert
        await PageHelper.acceptAlert();
    });

    it('confirm box should display on button click', async () => {
        // Clicking confirm box button
        await AlertPage.confirmButton.click();

        // Verifying alert text to be 'Do you confirm action?'
        const alertText = await browser.getAlertText();
        expect(alertText).toBe(AlertPage.alertTexts.confirmBoxText);

        // Accepting confirm box
        await PageHelper.acceptAlert();

        // Verifying "You selected Ok" text displayed
        let result = await AlertPage.confirmResult;
        await expect(result).toHaveTextContaining([
            AlertPage.alertTexts.youSelected,
            AlertPage.commonStrings.ok,
        ]);

        await AlertPage.confirmResult.isDisplayed;
        // Clicking confirm box button again
        await AlertPage.confirmButton.click();

        // Cancelling confirm box
        await PageHelper.dismissAlert();

        // Verifying "You selected Cancel" text displayed
        result = await AlertPage.confirmResult;
        await expect(result).toHaveTextContaining([
            AlertPage.alertTexts.youSelected,
            AlertPage.commonStrings.cancel,
        ]);
    });

    it.only('Prompt box should display and show expected message', async () => {
        await AlertPage.goToPage();
        // Clicking delayed alert button
        await AlertPage.promptButton.click();

        // Verifying prompt box is displayed
        expect(await browser.isAlertOpen()).toBe(true);

        // Entering text to prompt box
        await browser.sendAlertText(AlertPage.alertTexts.ceyhun);

        // Accepting alert
        await PageHelper.acceptAlert();

        await browser.pause(3000);

        // Verifying 'You entered Ceyhun Ganioglu' text displayed
        result = await AlertPage.promptResult;
        await expect(result).toHaveTextContaining([
            AlertPage.alertTexts.youEntered,
            AlertPage.alertTexts.ceyhun,
        ]);
    });
});
