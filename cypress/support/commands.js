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

// Add employee in case it exists
Cypress.Commands.add('addEmployee', (firstName, lastName, id) => {
    // Click on Add button
    cy.get('button').contains('Add').click({force: true});

    // Type the first name
    cy.get('input[name="firstName"]').type(firstName);
    
    // Type the last name
    cy.get('input[name="lastName"]').type(lastName);

    // Type the employee id
    cy.get('label').contains('Employee Id').parent().parent().find('div').eq(1).clear();
    cy.typeInField('Employee Id', id);

    // Save
    cy.get('button').contains('Save').click();
})

// Search user/employee
Cypress.Commands.add('search', (label, value) => {
    // Type the username in order to search it
    cy.get('label').contains(label).parent().parent().find('div:last-child input').clear().type(value);

    // Click on Submit
    cy.get('button[type="submit"]').click({force: true});

    cy.wait(1000);
} )

// Delete employee in case it exists
Cypress.Commands.add('deleteEmployee', (employee) => {
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

// Add vacancy
Cypress.Commands.add('addVacancy', (vacancy, job, manager) => {
    // Type the vacancy name
    cy.typeInField('Vacancy Name', vacancy);

    // Find and select the job title
    cy.selectOption('Job Title', job);

    // Type the Hiring Manager and select it in autocomplete
    cy.typeInField('Hiring Manager', manager);

    cy.wait(2000);

    cy.get('div[role="listbox"]').find('.oxd-autocomplete-option').each(($element, index, $list) => {
        
        if($element.text().includes(manager))
            cy.wrap($element).click();
    })

    // Click on Submit
    cy.get('button[type="submit"]').click();

    cy.intercept('/web/index.php/api/v2/recruitment/vacancies?limit=0').as('editVacancy');
    cy.wait('@editVacancy');
})

// Delete vacancy
Cypress.Commands.add('deleteVacancy', (vacancy) => {
    cy.get('body').then( $body => {
        if($body.find('div.oxd-table-card > div > div:nth-child(2)').text().includes(vacancy)) {
            cy.get('div.oxd-table-card > div > div:nth-child(2)').contains(vacancy).parent().parent().find('div:nth-child(6) button:first-child').click();
            cy.get('div.orangehrm-modal-footer > button > i.bi-trash').click();
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