const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:
      'https://opensource-demo.orangehrmlive.com/web/index.php',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
