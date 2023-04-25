const Page = require('./page');

/**
 * sub-page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define error messages on the page
     */
    errorMessages = {
        lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.',
        passwordRequired: 'Epic sadface: Password is required',
        usernameRequired: 'Epic sadface: Username is required',
        invalidUserPass:
            'Epic sadface: Username and password do not match any user in this service',
    };

    /**
     * define usernames
     */
    usernames = {
        standard: 'standard_user',
        lockedOut: 'locked_out_user',
        problem: 'problem_user',
        performanceGlitch: 'performance_glitch_user',
        dummyUser: 'dummy_user',
    };

    password = {
        correct: 'secret_sauce',
        wrong: 'dummy_pass',
    };

    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $('#user-name');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnLogin() {
        return $('#login-button');
    }

    get errorWithMessage() {
        return $(
            '#login_button_container > div > form > div.error-message-container.error > h3',
        );
    }

    /**
     * a method to encapsulate automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('');
    }
}

module.exports = new LoginPage();
