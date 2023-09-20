/// <reference types="Cypress" />

describe('Login test cases', () => {
    it('Login with correct credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )
        
        cy.get('h6.oxd-text').should('have.text', 'Dashboard');
    })

    it('Login with incorrect credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');

        cy.fixture('data').then( (data) => {
            cy.login(data.incorrectUsername, data.incorrectPassword);
        } )

        cy.get('div > p.oxd-alert-content-text').should('have.text', 'Invalid credentials');
    })
})
