const Page = require('./page');

/**
 * sub-page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    get topHeader() {
        // #header_container > div.primary_header > div.header_label > div
        return $(
            '#header_container > div.primary_header > div.header_label > div.app_logo',
        );
    }
}

module.exports = new SecurePage();
