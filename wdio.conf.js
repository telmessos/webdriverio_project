const allure = require('allure-commandline');
exports.config = {
    runner: 'local',
    specs: ['./test/specs/**/*'],
    // specs: ['./test/specs/**/alerts.spec.js'],
    exclude: [],
    maxInstances: 1,
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            acceptInsecureCerts: true,
        },
    ],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: [
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: true,
            },
        ],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    // onComplete Allure will be executed
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure(['generate', 'allure-results', '--clean']);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000,
            );

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout);

                if (exitCode !== 0) {
                    return reject(reportError);
                }

                // eslint-disable-next-line no-console
                console.log('Allure report successfully generated');
                resolve();
            });
        });
    },
};
