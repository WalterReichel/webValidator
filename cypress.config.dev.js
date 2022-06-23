const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev-validator-vue.iatistandard.org",
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/integration/*.spec.js",
    screenshotOnRunFailure: false,
    video: false,
    supportFile: "cypress/support/index.js",
    setupNodeEvents(on, config) {

    },
  },
});
