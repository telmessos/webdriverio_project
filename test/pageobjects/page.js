/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class Page {
    /**
     * Common strings list
     */
    commonStrings = {
        emptyString: '',
    };
    /**
     * Opens a sub-page of the page
     * @param path path of the sub-page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url(`/${path}`);
    }
};
