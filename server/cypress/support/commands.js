Cypress.Commands.add('login', (user) => { 

    cy.request('Post', 'localhost:3001/api/login',user)
    .then(response => {
        localStorage.setItem('userLoggerInformation', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
    })

})

Cypress.Commands.add('createBlog', (blog) => {

    cy.request({
        url: 'localhost:3001/api/blogs',
        method: 'POST',
        body: blog,
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('userLoggerInformation')).token}`
        }
    })

    cy.visit('http://localhost:3000')

})


Cypress.Commands.add('createUser', (user) => {

    cy.request({
        url: 'localhost:3001/api/users',
        method: 'POST',
        body: user
    })

    cy.visit('http://localhost:3000')
})



// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
