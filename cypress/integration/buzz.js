describe('Buzz test cases', () => {
    it('Create a post', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on Buzz
        cy.get('a[href*="Buzz"]').as('buzz');
        cy.get('@buzz').click();

        // Type in post textarea
        cy.fixture('data').then((data) => {
            cy.get('textarea').type(data.post);
            cy.get('button[type="submit"]').click();
        })

        // Verify the post
        cy.fixture('data').then((data) => {
            cy.get('div.oxd-grid-item p.orangehrm-buzz-post-body-text').eq(0).then(($element) => {
                expect($element).to.have.text(data.post);
            })
        })
    })
})