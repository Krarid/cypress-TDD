/// <reference types="Cypress" />

describe('PIM test cases', () => {
    it('Add an employee', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on PIM
        cy.get('a[href*="Pim"]').as('PIM');
        cy.get('@PIM').click();

        // Verify if user exists if so delete it
        cy.fixture('data').then((data) => {
            cy.deleteEmployee(data.firstName);
        })

        // Click on Add button
        cy.get('button').contains('Add').click();

        // Type the first name
        cy.fixture('data').then((data) => {
            cy.get('input[name="firstName"]').type(data.firstName);
        })
        
        // Type the last name
        cy.fixture('data').then((data) => {
            cy.get('input[name="lastName"]').type(data.lastName);
        })

        // Type the employee id
        cy.fixture('data').then((data) => {
            cy.get('label').contains('Employee Id').parent().parent().find('div').eq(1).clear();
            cy.typeInField('Employee Id', data.employeeID);
        })

        // Save
        cy.get('button').contains('Save').click();

        // Verify if the user was added successfully
        cy.fixture('data').then((data) => {
            cy.get('div[class*="employee-name"] > h6').should('have.text', data.firstName + ' ' + data.lastName);
        })
    })
})