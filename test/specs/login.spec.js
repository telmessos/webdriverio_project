const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {
    it('should not login with the empty username and password', async () => {
        await LoginPage.open();
        // Trying to log in with empty strings
        await LoginPage.login(
            LoginPage.commonStrings.emptyString,
            LoginPage.commonStrings.emptyString,
        );
        // Expect username required error message exist
        await expect(LoginPage.errorWithMessage).toBeExisting();
        await expect(LoginPage.errorWithMessage).toHaveTextContaining(
            LoginPage.errorMessages.usernameRequired,
        );
        // Trying to log in with standard user but empty password
        await LoginPage.login(
            LoginPage.usernames.standard,
            LoginPage.commonStrings.emptyString,
        );

        // Expect password required error message exist
        await expect(LoginPage.errorWithMessage).toBeExisting();
        await expect(LoginPage.errorWithMessage).toHaveTextContaining(
            LoginPage.errorMessages.passwordRequired,
        );
    });
    it('should not login with the locked out user', async () => {
        await LoginPage.login(
            LoginPage.usernames.lockedOut,
            LoginPage.password.correct,
        );
        await expect(LoginPage.errorWithMessage).toBeExisting();
        await expect(LoginPage.errorWithMessage).toHaveTextContaining(
            LoginPage.errorMessages.lockedOutUser,
        );
    });

    it('should not login with invalid username and password', async () => {
        // Trying to log in with dummy user
        await LoginPage.login(
            LoginPage.usernames.dummyUser,
            LoginPage.password.correct,
        );
        await expect(LoginPage.errorWithMessage).toBeExisting();
        await expect(LoginPage.errorWithMessage).toHaveTextContaining(
            LoginPage.errorMessages.invalidUserPass,
        );

        // Trying to log in with existing user and wrong password
        await LoginPage.login(
            LoginPage.usernames.standard,
            LoginPage.password.wrong,
        );
    });

    it('should login with valid credentials', async () => {
        await LoginPage.login(
            LoginPage.usernames.standard,
            LoginPage.password.correct,
        );
        await expect(SecurePage.topHeader).toBeExisting();
        await expect(SecurePage.topHeader).toHaveTextContaining('Swag Labs');
    });
});
