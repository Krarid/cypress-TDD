# cypress-TDD
 A QA Automation project developed with JavaScript and Test Driven Development

# Prerequisites
1. Install Node.js
2. Install VS Code
3. Install Cypress

# Steps
1. Open the VS Code Terminal
2. Type npm -i init
    1. Package name: [Enter]
    2. Version: [Enter]
    3. Description: A QA Automation project developed with JavaScript and Test Driven Development
    4. Entry point: [Enter]
    5. Test command: [Enter]
    6. Git repository: https://github.com/Krarid/cypress-TDD
    7. Author: Javier Meléndez Zacarías
    8. License: Apache-2.0
3. Type: npm install cypress —save-dev
4. To open Cypress Test Runner type: node_modules/.bin/cypress open
5. Click on E2E Testing and continue
6. Select any browser and Start
7. Add the following specPattern in cypress.config.js
    1. specPattern: ‘cypress/integration/login/*.js’
8. To run Cypress: node_modules/.bin/cypress run —browser electron --headed
9. In the package.json file add the following command in the "scripts" section: "scripts": {
    "test": "node_modules/.bin/cypress run",
    "open": "node_modules/.bin/cypress open" }
10. You can run the automation scripts by typing in the terminal: npm run test
