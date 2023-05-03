const { alertIsPresent } = require('wdio-wait-for');

class PageHelper {
    async acceptAlert() {
        await browser.waitUntil(alertIsPresent);
        await browser.acceptAlert();
    }

    async dismissAlert() {
        await browser.waitUntil(alertIsPresent);
        await browser.dismissAlert();
    }
}
module.exports = new PageHelper();
