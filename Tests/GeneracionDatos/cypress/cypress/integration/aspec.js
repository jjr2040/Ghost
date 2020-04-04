 var mockaroo = require('mockaroo');
 var email, usuario_failed, usuario, user, post, postModificar, pagina, paginaModificar, design, tag;

 async function generarData(schema, cantidad){
   var client = new mockaroo.Client({
       apiKey: '1a916f00'
   })

   return client.generate({
       count: cantidad,
       schema: schema
   }).then(function(records) {
      return records;
   })
 }

 async function cargarInformacion(){
   usuario_failed = await generarData("ghost_register_failed",1);
   usuario = await generarData("ghost_register",1);
   user = await generarData("ghost_login",1);
   post = await generarData("ghost_post",1);
   pagina = await generarData("ghost_post",1);
   postModificar = await generarData("ghost_post",1);
   paginaModificar = await generarData("ghost_post",1);
   design = await generarData("ghost_design",1);
   email = await generarData("ghost_email",1);
   tag = await generarData("ghost_tag",1);
 }

describe('Test of generation data in Ghost', async () => {

    before(async () => {
      await cargarInformacion();
    });

    it('Visits Ghost and register failed', () => {
        console.log('usuario: ', usuario);
        cy.visit('http://localhost:2368/ghost/#/setup/one')
        cy.wait(1000)
        cy.contains('Create your account ').click()
        //cy.matchImageSnapshot('register')
        cy.get('form[id="setup"]').find('input[name="blog-title"]').click().type(usuario.titulo)
        cy.get('form[id="setup"]').find('input[name="name"]').click().type(usuario.nombre)
        cy.get('form[id="setup"]').find('input[name="email"]').click().type(usuario_failed.email)
        cy.get('form[id="setup"]').find('input[name="password"]').click().type(usuario_failed.password)
        cy.get('button[type="submit"]').click()
        cy.wait(1900)
        cy.contains('Password must be at least 10 characters long')
        cy.contains('Invalid Email.')
    })

    it('Visits Ghost and register', () => {
        console.log('usuario: ', usuario);
        cy.visit('http://localhost:2368/ghost/#/setup/one')
        cy.wait(1000)
        cy.contains('Create your account ').click()
        //cy.matchImageSnapshot('register')
        cy.get('form[id="setup"]').find('input[name="blog-title"]').click().type(usuario.titulo)
        cy.get('form[id="setup"]').find('input[name="name"]').click().type(usuario.nombre)
        cy.get('form[id="setup"]').find('input[name="email"]').click().type(usuario.email)
        cy.get('form[id="setup"]').find('input[name="password"]').click().type(usuario.password)
        cy.get('button[type="submit"]').click()
        cy.wait(1900)
        cy.contains('I\'ll do this later, take me to my site!').click()
        cy.contains('@').click()
        cy.contains(' Sign Out').click()
    })

    it('Visits Ghost and fails at login', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1900)
        //cy.matchImageSnapshot('login');
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(user.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(user.password)
        //cy.matchImageSnapshot('login-failed')
        cy.get('button[type="submit"]').click()
        cy.contains('Access denied.')
    })

    it('Visits Ghost and fails at login for password wrong', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1900)
        //cy.matchImageSnapshot('login');
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(user.password)
        //cy.matchImageSnapshot('login-failed')
        cy.get('button[type="submit"]').click()
        cy.contains('Your password is incorrect.')
    })

    it('Visits Ghost and success at login', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1900)
        //cy.matchImageSnapshot('login');
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
        //cy.matchImageSnapshot('login-failed')
        cy.get('button[type="submit"]').click()
        cy.contains('View site')
        //cy.matchImageSnapshot('login-success')
        cy.contains('@').click()
        cy.contains(' Sign Out').click()
    })

    it('Visits Ghost and create a post', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1999)
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
        cy.get('button[type="submit"]').click()
        cy.get('li[class="gh-nav-list-new relative"]').find('a[title="New post"]').click()
        cy.get('textarea[placeholder="Post Title"]').click().type(post.titulo)
        cy.get('div[data-placeholder="Begin writing your post..."]').click()
        cy.visit('http://localhost:2368/ghost/#/posts?type=draft',{ timeout: 50000 })
        cy.wait(1999)
        cy.get('main[role="main"]').contains(post.titulo).click()
        cy.get('div[data-placeholder="Begin writing your post..."]').click().type(post.contenido + ' {enter}')
        cy.contains('Publish').click()
        cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
        cy.visit('http://localhost:2368/ghost/#/posts?type=published',{ timeout: 40000 })
        cy.get('main[role="main"]').contains(post.titulo)
    })

    it('Visits Ghost and modify a post', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1999)
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
        cy.get('button[type="submit"]').click()
        cy.get('li[class="gh-nav-list-new relative"]').contains('Posts').click()
        cy.get('main[role="main"]').contains(post.titulo).click({force: true})
        cy.get('div[data-placeholder="Begin writing your post..."]').click().type(' {selectall} '+postModificar.contenido+' {enter}')
        cy.contains('Update').click()
        cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
        cy.visit('http://localhost:2368/ghost/#/posts?type=published',{ timeout: 40000 })
        cy.get('main[role="main"]').contains(post.titulo).click({force: true})
        cy.get('div[data-placeholder="Begin writing your post..."]').contains(postModificar.contenido)
    })

    it('Creación página de forma satisfactoria', function() {
  		cy.visit('http://localhost:2368/ghost/#/signin')
  		cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
  		cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
  		cy.get('form[id="login"]').find('button[class="login gh-btn gh-btn-blue gh-btn-block gh-btn-icon ember-view"]').click()
  		cy.wait(1990)
  		cy.get('a[href="#/pages/"]').click()
  		createPageAndPublish(pagina.titulo, pagina.contenido + ' {enter} ')
  		cy.get('a[href="#/pages/"]').click()
  		cy.contains(pagina.titulo)
  	})

    it('Modificación página de forma satisfactoria', function() {
  		cy.visit('http://localhost:2368/ghost/#/signin')
  		cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
  		cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
  		cy.get('form[id="login"]').find('button[class="login gh-btn gh-btn-blue gh-btn-block gh-btn-icon ember-view"]').click()
  		cy.wait(1990)
  		cy.get('a[href="#/pages/"').click({force: true})
  		//createPageAndPublish('Página a modificar', 'Texto para ser modificado {enter} ')
  		cy.get('main[role="main"]').contains(pagina.titulo).click({force: true})
  		cy.get('div[class="gh-publishmenu ember-view"]').click()
  		cy.get('div[class="gh-publishmenu-radio-label"]').contains('Unpublished').click()
  		cy.get('footer[class="gh-publishmenu-footer"]').find('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
  		cy.get('main[role="main"]').find('textarea[placeholder="Page Title"]').click({force: true} ).type('{selectall} '+paginaModificar.titulo+' {enter}')
  		cy.get('main[role="main"]').find('div[data-placeholder="Begin writing your page..."]').click({force: true} ).type(' {selectall} '+paginaModificar.contenido+' {enter} ')
  		cy.get('div[class="gh-publishmenu ember-view"]').click()
  		cy.get('footer[class="gh-publishmenu-footer"]').find('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
  		cy.get('a[href="#/pages/"]').click({force: true})
  		cy.contains(paginaModificar.titulo)
  	})

    it('Search without results', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1900)
        //cy.matchImageSnapshot('login');
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
        //cy.matchImageSnapshot('login-failed')
        cy.get('button[type="submit"]').click()
        cy.get('button[class="gh-nav-btn-search"]').click()
        cy.get('div[class="gh-nav-search-modal"]').find('input[placeholder="Search site..."]').eq(0).type(postModificar.titulo+post.titulo)
        cy.contains('No results found')
    })

    it('Search with results', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1900)
        //cy.matchImageSnapshot('login');
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
        //cy.matchImageSnapshot('login-failed')
        cy.get('button[type="submit"]').click()
        cy.get('button[class="gh-nav-btn-search"]').click()
        cy.get('div[class="gh-nav-search-modal"]').find('input[placeholder="Search site..."]').eq(0).type(post.titulo)
        cy.get('li[class="ember-power-select-group"]').contains(post.titulo).click()
        cy.contains(postModificar.contenido)
    })

    it('Design', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1999)
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
        cy.get('button[type="submit"]').click()
        cy.get('ul[class="gh-nav-list gh-nav-settings"]').contains('Design').click()
        cy.get('div[class="gh-blognav-container pa5 pt6 bg-grouped-table shadow-1 br3"]').eq(1).find('input[placeholder="Label"]').last().click({force: true}).type(design.label)
        cy.get('button[class="gh-blognav-add"]').eq(1).click({force: true})
        cy.contains('Save').click()
        cy.contains('Saved')
    })

    it('Staff invite people success', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1999)
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
        cy.get('button[type="submit"]').click()
        cy.get('ul[class="gh-nav-list gh-nav-manage"]').contains('Staff').click()
        cy.get('button[class="gh-btn gh-btn-green"]').click({force: true})
        cy.get('input[name="email"]').eq(0).click({force: true}).type(email.email)
        cy.get('select[name="role"]').select(email.role)
        cy.get('button[class="gh-btn gh-btn-green gh-btn-icon ember-view"]').click({force: true})
        cy.wait(1900)
        cy.visit('http://localhost:2368/ghost/#/tags')
        cy.visit('http://localhost:2368/ghost/#/staff')
        cy.wait(2900)
        cy.contains(email.email)
    })

    it('Staff invite people with that email address was already invited', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1999)
        cy.get('form[id="login"]').find('input[name="identification"]').click().type(usuario.email)
        cy.get('form[id="login"]').find('input[name="password"]').click().type(usuario.password)
        cy.get('button[type="submit"]').click()
        cy.get('ul[class="gh-nav-list gh-nav-manage"]').contains('Staff').click()
        cy.get('button[class="gh-btn gh-btn-green"]').click({force: true})
        cy.get('input[name="email"]').eq(0).click({force: true}).type(email.email)
        cy.get('select[name="role"]').select(email.role)
        cy.contains('A user with that email address was already invited.')
    })
})

function createPageAndPublish(title, contenido) {
	cy.get('main[role="main"]').find('section[class="view-actions"]').find('a[href="#/editor/page/"]').click()
	cy.get('main[role="main"]').find('textarea[placeholder="Page Title"]').click().type(title)
	cy.get('main[role="main"]').find('div[data-placeholder="Begin writing your page..."]').click()
	cy.visit('http://localhost:2368/ghost/#/pages',{timeout: 50000})
	cy.wait(1999)
	cy.get('main[role="main"]').contains(title).click({force: true})
	cy.get('main[role="main"]').find('div[data-placeholder="Begin writing your page..."]').click().type(contenido)
	cy.contains('Publish').click()
	cy.get('footer[class="gh-publishmenu-footer"]').find('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
	cy.wait(199)
}
