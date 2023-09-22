describe( 'Recruitment test cases', () => {
    it('Add a vacancy', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on Recruitment
        cy.get('a[href*="recruitment"]').as('recruitment');
        cy.get('@recruitment').click();

        // Click on "Vacancies" from topbar
        cy.get('li[class*="topbar"]').contains('Vacancies').as('vacancies');
        cy.get('@vacancies').click();

        cy.intercept('/web/index.php/api/v2/recruitment/hiring-managers?limit=0').as('hiringManagers');
        cy.wait('@hiringManagers');

        // Prerequisite: Verify if the vacancy doesn't exist if so delete it
        cy.fixture('data').then((data) => {
            cy.deleteVacancy(data.vacancyName);
        })
        
        cy.get('button').contains('Add').click({force: true});

        // Add the vacancy
        cy.fixture('data').then((data) => {
            cy.addVacancy(data.vacancyName, data.vacancyJob, data.hiringManager);
        })

        // Return to vacancies list
        cy.get('@vacancies').click();
    
        // Find the recently added user
        cy.fixture('data').then((data) => {
            cy.get('div.oxd-table-card > div > div:nth-child(2)').contains(data.vacancyName).should('have.text', data.vacancyName);
        });
    }) 
} )