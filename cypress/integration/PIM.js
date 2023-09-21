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
    })
})