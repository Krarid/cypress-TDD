/// <reference types="Cypress" />

describe('Admin test cases', () => {
    it('Add a user to the system', () => {
        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        cy.get('a[href*="Admin"]').as('admin');
        cy.get('@admin').click();

        // Verify if the user already exists, if so delete it
        cy.fixture('data').then((data) => {
            cy.deleteUser(data.employeeUsername);
        })

        cy.get('button').contains('Add').click();

        // Find and select the user role
        cy.fixture('data').then((data) => {
            cy.selectOption('User Role', data.userRole[0]);
        })

        // Find and select the status
        cy.fixture('data').then((data) => {
            cy.selectOption('Status', data.status[0]);
        })

        // Type the Employee Name and select in autocomplete
        cy.fixture('data').then((data) => {
            cy.typeInField('Employee Name', data.employeeName[0]);

            cy.wait(2000);

            cy.get('div[role="listbox"]').find('.oxd-autocomplete-option').each(($element, index, $list) => {
                
                if($element.text().includes(data.employeeName[0]))
                    cy.wrap($element).click();
            })
        })

        // Type the Username
        cy.fixture('data').then((data) => {
            cy.typeInField('Username', data.employeeUsername);
        })

        // Type the password
        cy.fixture('data').then((data) => {
            cy.typeInField('Password', data.employeePassword);
        })
        
        // Type the confirm password
        cy.fixture('data').then((data) => {
            cy.typeInField('Confirm Password', data.employeePassword);
        })

        // Click on Submit
        cy.get('button[type="submit"]').click();

        cy.intercept('/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC').as('users');
        cy.wait('@users');

        cy.scrollTo(0,0);

        // Type the username in order to search it
        cy.fixture('data').then((data) => {
            cy.typeInField('Username', data.employeeUsername);
        })

        // Click on Submit
        cy.get('button[type="submit"]').click({force: true});

        // Find the recently added user
        cy.fixture('data').then((data) => {
            cy.get('div.oxd-table-card > div[role="row"]').each(($element, index, $list) => {
                expect($element.find('div').eq(3).text()).to.be.equal(data.employeeUsername)
            })
        })
    })

    it('Add a user to the system with existing username', () => {
        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        cy.get('a[href*="Admin"]').as('admin');
        cy.get('@admin').click();

        cy.get('button').contains('Add').click();

        // Find and select the user role
        cy.fixture('data').then((data) => {
            cy.selectOption('User Role', data.userRole[0]);
        })

        // Find and select the status
        cy.fixture('data').then((data) => {
            cy.selectOption('Status', data.status[0]);
        })

        // Type the Employee Name and select in autocomplete
        cy.fixture('data').then((data) => {
            cy.typeInField('Employee Name', data.employeeName[0]);

            cy.wait(2000);

            cy.get('div[role="listbox"]').find('.oxd-autocomplete-option').each(($element, index, $list) => {
                
                if($element.text().includes(data.employeeName[0]))
                    cy.wrap($element).click();
            })
        })

        // Type the Username
        cy.fixture('data').then((data) => {
            cy.typeInField('Username', data.employeeUsername);
        })

        // Type the password
        cy.fixture('data').then((data) => {
            cy.typeInField('Password', data.employeePassword);
        })
        
        // Type the confirm password
        cy.fixture('data').then((data) => {
            cy.typeInField('Confirm Password', data.employeePassword);
        })

        // Click on Submit
        cy.get('button[type="submit"]').click();

        // Verify if error message gets displayed: "Already exists"
        cy.get('span.oxd-input-field-error-message').should('have.text', 'Already exists');
    })

    it('Add a job', () => {
        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on "Admin" from left sidepanel
        cy.get('a[href*="Admin"]').as('admin');
        cy.get('@admin').click();

        // Click on "Job" from topbar
        cy.get('li[class*="topbar"]').contains('Job').click();

        // Click on "Job Titles"
        cy.get('ul.oxd-dropdown-menu > li').contains('Job Titles').click();

        // Delete the job in case it exists
        cy.fixture('data').then((data) => {
            cy.deleteJob(data.jobTitle);
        })

        cy.get('button').contains('Add').click({force: true});

        // Type the Job Title
        cy.fixture('data').then((data) => {
            cy.typeInField('Job Title', data.jobTitle);
        })

        // Click on Submit
        cy.get('button[type="submit"]').click();

        // Wait for the response
        cy.intercept('/web/index.php/api/v2/admin/job-titles?limit=50&offset=0&sortField=jt.jobTitleName&sortOrder=ASC').as('jobs');
        cy.wait('@jobs');

        // Search the recently added job
        cy.fixture('data').then((data) => {
            cy.get('div.oxd-table-card > div > div:nth-child(2)').contains(data.jobTitle).should('have.text', data.jobTitle);
        });
    })

    it('Delete a job', () => {
        cy.visit(Cypress.env('url'));

        cy.fixture('data').then( (data) => {
            cy.login(data.username, data.password);
        } )

        cy.get('h6.oxd-text').should('have.text', 'Dashboard');

        // Click on "Admin" from left sidepanel
        cy.get('a[href*="Admin"]').as('admin');
        cy.get('@admin').click();

        // Click on "Job" from topbar
        cy.get('li[class*="topbar"]').contains('Job').click();

        // Click on "Job Titles"
        cy.get('ul.oxd-dropdown-menu > li').contains('Job Titles').click();

        // Delete the job in case it exists
        cy.fixture('data').then((data) => {
            cy.deleteJob(data.jobTitle);
        })

        // Search the recently deleted job
        cy.fixture('data').then((data) => {
            cy.get('div.oxd-table-card > div > div:nth-child(2) > div').then( ($element) => {
                expect($element).not.to.include.text(data.jobTitle);
            } );
        });
    })
})