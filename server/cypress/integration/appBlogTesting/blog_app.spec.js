describe('blog app', () => {

    beforeEach(() => {

        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = [{
            name: 'Dalvin Molina',
            username: 'dalvinMs',
            password: '12345678'
        }, {
            name: 'Juan Perez',
            username: 'juanPerez',
            password: '123456'
        }]

        cy.createUser(user[0])
        cy.createUser(user[1])
    })

    it('Login form  is show', () => {
        cy.contains('Blogs')
        cy.contains('Username')	
        cy.contains('Password')
    })

    describe('Login', () => {

        it('fails with wrong password', () => {

            cy.get('#username').type('dalvinMs')
            cy.get('#password').type('12345')
            cy.get('#loginBlog').click()
            
            cy.get('div.advertenceMessage').contains('invalid user or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        })

        it('succeeds with correct credentials', () => {

            cy.get('#username').type('dalvinMs')
            cy.get('#password').type('12345678')
            cy.get('#loginBlog').click()

            cy.contains('Dalvin Molina logged in')
            cy.contains('new blog')

        })

        describe('when logged in', () => {

            beforeEach(() => {
                cy.login({ username: 'dalvinMs', password: '12345678' })
            })

            it('A blog can be created', () => {
                    
                    cy.contains('new blog').click()
                    cy.get('#title').type('Test blog from cypress yupii!!! this is amazing')
                    cy.get('#author').type('Dalvin Molina')
                    cy.get('#url').type('www.test.com')
                    cy.get('#createBlog').click()
    
                    cy.contains('Test blog')
                    cy.contains('Test blog from cypress yupii!!! this is amazing')
            })

            describe('when a blog exists', () => {

                beforeEach(() => {
                    cy.createBlog({
                        "author": "Kris Holt",
                        "title": "Apple Watch Series 8 could include a body temperature sensor",
                        "url": "https://www.engadget.com/apple-watch-series-8-body-temperature-monitor-low-power-mode-watchos-9-151141297.html",
                        "likes": 3                        
                    })

                    cy.createBlog({
                        "author": "Mat Smith",
                        "title": "The Morning After: Vivo claims it’s solved the foldable phone crease problem",
                        "url": "https://www.engadget.com/the-morning-after-vivo-claims-its-solved-the-foldable-phone-crease-111515939.html",                       
                        "likes": 5
                    })

                    cy.createBlog({
                        "author": "Megan Henney",
                        "title": "Inflation worsens in Mountain States, with prices soaring above 10% - Fox Business",
                        "url": "https://www.foxbusiness.com/economy/inflation-worsens-mountain-states-prices-soaring-above-10",
                    })

                })

                it('A blog can be liked', () => {
                        

                        cy.contains('Apple Watch Series 8 could include a body temperature sensor').as('firstBlog')
                        cy.get('@firstBlog').find('button').as('viewShowBlog')
                        cy.get('@viewShowBlog').click()
                        
                        cy.get('@firstBlog').parent().contains('like').as('buttonLike')
                        cy.get('@buttonLike').click()
                        cy.contains('likes: 4')
                })

                it('A user can delete a blog', () => {

                    cy.contains('The Morning After: Vivo claims it’s solved the foldable phone crease proble').as('firstBlog')
                    cy.get('@firstBlog').find('button').as('viewShowBlog')
                    cy.get('@viewShowBlog').click()

                    cy.get('@firstBlog').parent().contains('delete').as('buttonLike')
                    cy.get('@buttonLike').click()

                    cy.contains('The Morning After: Vivo claims it’s solved the foldable phone crease proble').should('not.exist')
                })

                it('The user can\'t delete a blog of other users', () => {	

                    cy.login({ username: 'juanPerez', password: '123456' })

                    cy.contains('Apple Watch Series 8 could include a body temperature sensor').as('firstBlog')
                    cy.get('@firstBlog').find('button').as('viewShowBlog')
                    cy.get('@viewShowBlog').click()

                    cy.get('@firstBlog').parent().contains('delete').as('buttonLike')
                    cy.get('@buttonLike').click()

                    cy.contains('Apple Watch Series 8 could include a body temperature sensor').should('exist')


                })

                it('The blogs are sorted by likes', () => {
                    
                    let blogsSorted = []

                    cy.get('.content-blog').then(blogs => {
                        const blogsArray = blogs.toArray()                        

                        for(let blog of blogsArray) {

                            cy.wrap(blog).as('contentBlog')
                            
                            cy.get('@contentBlog').find('button').as('blogShow')
                            cy.get('@blogShow').click()	

                            cy.get('@contentBlog').contains('likes: ').as('likes')
                            cy.get('@likes').then(likes => {
                                const countLikes = likes.text().split(' ')[1]
                                blogsSorted.push(countLikes)    
                            })
                        }                        
                    })

                    

                    cy.get('.content-blog').each(($blog, index) => {
                        cy.wrap($blog).contains('likes:').as('likes')

                        const arrayLikesSorted = [...blogsSorted.sort((a,b) => b-a)]

                        cy.get('@likes').then(likes => {
                            const likesText = likes.text();
                            const likesParams = likesText.substring(0, likesText.length - 5).trim()
                            expect(`likes: ${arrayLikesSorted[index]}`).to.equal(likesParams)
                        })
                    })

                })
                
            })

        })
    })
})