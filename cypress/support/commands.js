// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[class*="login"]').click();
} )

// Delete user in case it exists
Cypress.Commands.add('deleteUser', (username) => {
    // Type the username in order to search it
    cy.get('label').contains('Username').parent().parent().find('div').eq(1).type(username);

    // Click on Submit
    cy.get('button[type="submit"]').click({force: true});

    cy.wait(1000);

    // Delete it in case exists
    cy.get('body').then($body => {
        if($body.find('div.oxd-table-card > div[role="row"]').length > 0) {
            cy.get('div.oxd-table-card > div[role="row"]').each(($element, index, $list) => {
                if( $element.find('div').eq(3).text().includes(username) ) {
                    cy.wrap($element).find('div i.bi-trash').parent().click();
                    cy.get('div.orangehrm-modal-footer > button > i.bi-trash').click();
                }
            })
        }
    })
})

// Delete job in case it exists
Cypress.Commands.add('deleteJob', (job) => {
    
    cy.get('div.oxd-table-card > div').each(($element, index, $list) => {
        if( $element.find('div:nth-child(2)').text().includes(job) ) {
            cy.wrap($element).find('div:nth-child(4) button:first-child').click({force: true});
            cy.get('div.orangehrm-modal-footer > button > i.bi-trash').click();
        }
    })
})

// Delete employee in case it exists
// Delete user in case it exists
Cypress.Commands.add('deleteEmployee', (employee) => {
    // Type the username in order to search it
    cy.get('label').contains('Employee Name').parent().parent().find('div').eq(1).type(employee);

    // Click on Submit
    cy.get('button[type="submit"]').click({force: true});

    cy.wait(1000);

    // Delete it in case exists
    cy.get('body').then($body => {
        if($body.find('div.oxd-table-card > div[role="row"]').length > 0) {
            cy.get('div.oxd-table-card > div[role="row"]').each(($element, index, $list) => {
                if( $element.find('div').eq(5).text().includes(employee) ) {
                    cy.wrap($element).find('div i.bi-trash').parent().click();
                    cy.get('div.orangehrm-modal-footer > button > i.bi-trash').click();
                }
            })
        }
    })
})

Cypress.Commands.add('selectOption', (field, value) => {
    cy.get('label').contains(field).parent().parent().find('div').eq(1).click();

    cy.get('div[role="listbox"] > div[role="option"]').each(($element, index, $list) => {
        if($element.text().includes(value))
            cy.wrap($element).click();
    })
} )

Cypress.Commands.add('typeInField', (field, value) => {
    cy.get('label').contains(field).parent().parent().find('div').eq(1).type(value);
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })