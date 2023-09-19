describe('Login test cases', () => {
    it('Login with correct credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[class*="login"]').click();
        cy.get('h6.oxd-text').should('have.text', 'Dashboard');
    })
})