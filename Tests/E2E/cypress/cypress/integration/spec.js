/*describe('Ghost Register', function() {
    it('Visits Ghost and register', function() {
        cy.visit('http://localhost:2368/ghost/#/setup/one')
        cy.contains('Create your account ').click()
        cy.get('form[id="setup"]').find('input[name="blog-title"]').click().type("admin")
        cy.get('form[id="setup"]').find('input[name="name"]').click().type("admin")
        cy.get('form[id="setup"]').find('input[name="email"]').click().type("admin@test.com")
        cy.get('form[id="setup"]').find('input[name="password"]').click().type("admin12345")
        cy.get('button[type="submit"]').click()
        cy.contains('I\'ll do this later, take me to my site!').click()
    })
})*/
describe('Ghost fails login', function() {
    it('Visits Ghost and fails at login', function() {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.get('form[id="login"]').find('input[name="identification"]').click().type("wrongemail1@example.com")
        cy.get('form[id="login"]').find('input[name="password"]').click().type("wrongemail")
        cy.get('button[type="submit"]').click()
        cy.contains('Access denied.')
    })
})
describe('Ghost login', function() {
    it('Visits Ghost and fails at login', function() {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.get('form[id="login"]').find('input[name="identification"]').click().type("admin@test.com")
        cy.get('form[id="login"]').find('input[name="password"]').click().type("admin12345")
        cy.get('button[type="submit"]').click()
        cy.contains('View site')
    })
})
describe('Ghost create a post', function(){
    it('Visits Ghost and create a post',function(){
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.get('form[id="login"]').find('input[name="identification"]').click().type("admin@test.com")
        cy.get('form[id="login"]').find('input[name="password"]').click().type("admin12345")
        cy.get('button[type="submit"]').click()
        cy.get('li[class="gh-nav-list-new relative"]').find('a[title="New post"]').click()
        //Cypress.on('uncaught:exception', (err, runnable) => {
          //  return false
        //})
        cy.get('textarea[placeholder="Post Title"]').click().type("This is my post #1")
        cy.get('div[data-placeholder="Begin writing your post..."]').click()
        cy.visit('http://localhost:2368/ghost/#/posts?type=draft',{ timeout: 50000 })
        cy.wait(1999)
        cy.get('main[role="main"]').contains('This is my post #1').click()
        cy.get('div[data-placeholder="Begin writing your post..."]').click().type('I am writing my post {enter}')
        cy.contains('Publish').click()
        cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
        cy.visit('http://localhost:2368/ghost/#/posts?type=published',{ timeout: 40000 })
        cy.get('main[role="main"]').contains('This is my post #1')
    })
})
describe('Ghost modify a post', function(){
    it('Visits Ghost and modify a post',function(){
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.get('form[id="login"]').find('input[name="identification"]').click().type("admin@test.com")
        cy.get('form[id="login"]').find('input[name="password"]').click().type("admin12345")
        cy.get('button[type="submit"]').click()
        cy.get('li[class="gh-nav-list-new relative"]').contains('Posts').click()
        cy.get('main[role="main"]').contains('This is my post #1').click({force: true})
        cy.get('div[data-placeholder="Begin writing your post..."]').click().type('I am modifying my post {enter}')
        cy.contains('Update').click()
        cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
        cy.visit('http://localhost:2368/ghost/#/posts?type=published',{ timeout: 40000 })
        cy.get('main[role="main"]').contains('This is my post #1').click({force: true})
        cy.get('div[data-placeholder="Begin writing your post..."]').contains('I am modifying my post')
    })
})
describe('Ghost visualize a post', function(){
    it('Visits Ghost and visualize a post', function(){
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.get('form[id="login"]').find('input[name="identification"]').click().type("admin@test.com")
        cy.get('form[id="login"]').find('input[name="password"]').click().type("admin12345")
        cy.get('button[type="submit"]').click()
        cy.wait(999)   
        cy.get('iframe').then(($iframe)=>{
            const doc=$iframe.contents()
            cy.wrap(doc.find('a[href="/this-is-my-post-1/"]')).click({force:true})  
        })
        cy.wait(2999)
        cy.get('iframe').then(($iframe2)=>{
            const doc=$iframe2.contents()
            cy.wrap(doc.find('h1')).should('contain', 'This is my post #1') 
        })
    })
})


describe('Ghost logout', function() {
    it('Visits Ghost and fails at login', function() {
        cy.contains('@').click()
        cy.contains(' Sign Out').click()
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })

    })
})
