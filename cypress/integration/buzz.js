describe('Buzz test cases', () => {
    it('Create a post', () => {
        cy.visit(Cypress.env('url'));

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

    it('Like a post', () => {
        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on Buzz
        cy.get('a[href*="Buzz"]').as('buzz');
        cy.get('@buzz').click();

        // Verify if the heart icon is not selected
        cy.get('div.oxd-grid-item svg').eq(0).then(($heart) => {
            if($heart.parent().hasClass('orangehrm-like-animation')) {
                cy.wrap($heart).click({force: true});
                cy.wait(1000);
            }
        });

        // Locate the first post and save the number of likes
        var likes = 0;
        cy.get('div.oxd-grid-item i[class*="like"] + p').as('likes');

        cy.get('@likes').eq(0).then(($element) => {
            likes = parseInt($element.text().split(' ')[0]);
        })

        // Click on heart icon
        cy.get('div.oxd-grid-item svg').eq(0).click({force: true});
        
        cy.wait(1000);

        cy.get('@likes').eq(0).then(($element) => {
            expect($element).to.include.text(likes + 1);
        })
    })
})