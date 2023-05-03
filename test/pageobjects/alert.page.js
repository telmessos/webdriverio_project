const Page = require('./page');

class AlertPage extends Page {
    alertTexts = {
        alertText: 'You clicked a button',
        timerAlertText: 'This alert appeared after 5 seconds',
        confirmBoxText: 'Do you confirm action?',
        youSelected: 'You selected',
        youEntered: 'You entered',
        ceyhun: 'Ceyhun Ganioglu',
    };

    get alertButton() {
        return $('#alertButton');
    }

    get timerAlertButton() {
        return $('#timerAlertButton');
    }

    get promptButton() {
        return $('#promtButton');
    }

    get confirmButton() {
        return $('#confirmButton');
    }

    get confirmResult() {
        return $('#confirmResult');
    }

    get promptResult() {
        return $('#promptResult');
    }
    async goToPage() {
        return browser.url('https://demoqa.com/alerts');
    }
}

module.exports = new AlertPage();
