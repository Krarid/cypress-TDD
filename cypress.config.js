const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/*.js',
    retries: {
      runMode: 3,
      openMode: 3,
      },
  },
  env: {
    url: "https://opensource-demo.orangehrmlive.com/"
  },
  projectId: "jhj3wq",
});
