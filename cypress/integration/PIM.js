/// <reference types="Cypress" />

describe('PIM test cases', () => {
    /* it('Add an employee', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on PIM
        cy.get('a[href*="Pim"]').as('PIM');
        cy.get('@PIM').click();

        // Verify if employee exists if so delete it
        cy.fixture('data').then((data) => {
            cy.deleteEmployee(data.firstName);
        })

        // Add the employee
        cy.fixture('data').then((data) => {
            cy.addEmployee(data.firstName, data.lastName, data.employeeID);
        })

        // Verify if the user was added successfully
        cy.fixture('data').then((data) => {
            cy.get('div[class*="employee-name"] > h6').should('have.text', data.firstName + ' ' + data.lastName);
        })
    }) */

    it('Edit an employee', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on PIM
        cy.get('a[href*="Pim"]').as('PIM');
        cy.get('@PIM').click();

        // Verify if employee exists if so delete it
        cy.fixture('data').then((data) => {
            cy.deleteEmployee(data.editFirstName);
        })

        // Verify if employee exists if so edit it otherwise create it and then edit it
        cy.fixture('data').then((data) => {
            
            // Type the username in order to search it
            cy.get('label').contains('Employee Name').parent().parent().find('div:last-child input').clear().type(data.firstName);

            // Click on Submit
            cy.get('button[type="submit"]').click({force: true});

            cy.wait(1000);

            // Add the employee and then fail the test to retry it
            cy.get('body').then($body => {
                if($body.find('div.oxd-table-card > div[role="row"]').length > 0) {
                    cy.get('div.oxd-table-card > div[role="row"]').each(($element, index, $list) => {
                        if( $element.find('div').eq(5).text().includes(data.firstName) ) {
                            cy.wrap($element).find('div i.bi-pencil-fill').parent().click();
                            // Type the first name
                            cy.get('input[name="firstName"]').clear().type(data.editFirstName);
                            
                            // Type the last name
                            cy.get('input[name="lastName"]').clear().type(data.editLastName);

                            // Save
                            cy.get('div.oxd-form-actions > p + button').click();

                            cy.get('@PIM').click();

                            // Type the username in order to search it
                            cy.get('label').contains('Employee Name').parent().parent().find('div').eq(1).type(data.editFirstName);

                            // Click on Submit
                            cy.get('button[type="submit"]').click({force: true});

                            cy.wait(1000);

                            cy.get('div.oxd-table-card > div[role="row"]').find('div').eq(5).should('contain.text', data.editFirstName);
                        }
                    })
                } else {
                    cy.fixture('data').then((data) => {
                        cy.addEmployee(data.firstName, data.lastName, data.employeeID);
                        cy.get('div[class*="employee-name"] > h6').should('have.text', data.firstName ); // FAIL THE TEST ON PURPOSE
                    })
                }
            })
        })
    })
})