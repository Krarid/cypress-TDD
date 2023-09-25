describe('Maintenance test cases', () => {
    it('Access to maintenance mode', () => {
        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on Maintenance
        cy.get('a[href*="maintenance"]').as('maintenance');
        cy.get('@maintenance').click();

        // Type the password
        cy.fixture('data').then( (data) => {
            cy.typeInField('Password', data.password);
        })

        // Click on Submit
        cy.get('button[type="submit"]').click();

        // Verify if user is on maintenance mode
        cy.get('h6.oxd-text.oxd-topbar-header-breadcrumb-module').should('have.text', 'Maintenance');
    })

    it('Access to maintenance mode with incorrect credentials', () => {
        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on Maintenance
        cy.get('a[href*="maintenance"]').as('maintenance');
        cy.get('@maintenance').click();

        // Type the password
        cy.fixture('data').then( (data) => {
            cy.typeInField('Password', data.incorrectPassword);
        })

        // Click on Submit
        cy.get('button[type="submit"]').click();

        // Verify if user is on maintenance mode
        cy.get('div[class*=error] > p').should('have.text', 'Invalid credentials');
    })
})