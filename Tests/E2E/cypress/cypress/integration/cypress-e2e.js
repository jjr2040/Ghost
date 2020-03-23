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

describe('Desplegar vista previa', function() {
	it('Desplegar vista previa', function() {
		cy.visit('http://localhost:2368/ghost/#/signin')
		cy.get('form[id="login"]').find('input[name="identification"]').click().type("admin@test.com")
		cy.get('form[id="login"]').find('input[name="password"]').click().type("admin12345")
		cy.get('form[id="login"]').find('button[class="login gh-btn gh-btn-blue gh-btn-block gh-btn-icon ember-view"]').click()
		cy.wait(1990)
		cy.get('a[href="#/site/"').click()
		cy.get('iframe').then(($iframe)=>{
			const doc = $iframe.contents()
			cy.wrap(doc.find('div[class="inner"]')).contains("Thoughts, stories and ideas.")
			cy.wrap(doc.find('h2[class="post-card-title"]')).contains("Welcome to Ghost").click({force: true})
			cy.wrap(doc.find('div[class="site-nav-left"]')).then(($nav)=>{
				const navi = $nav.contents()
				cy.wrap(navi.find('a[href="http://localhost:2368/tag/getting-started/"]'))
				cy.wrap(navi.find('a[href="http://localhost:2368/author/ghost/"]'))
				cy.wrap(navi.find('a[href="http://localhost:2368/"]'))
			})
		})
	})
})

describe('Creación página', function() {
	it('Creación página de forma satisfactoria', function() {
		cy.visit('http://localhost:2368/ghost/#/signin')
		cy.get('form[id="login"]').find('input[name="identification"]').click().type("admin@test.com")
		cy.get('form[id="login"]').find('input[name="password"]').click().type("admin12345")
		cy.get('form[id="login"]').find('button[class="login gh-btn gh-btn-blue gh-btn-block gh-btn-icon ember-view"]').click()
		cy.wait(1990)
		cy.get('a[href="#/pages/"]').click()
		createPageAndPublish('Nueva página creada', 'Texto para ingresar en el párrafo {enter} ')
		cy.get('a[href="#/pages/"]').click()
		cy.contains('Nueva página creada')
	})
})

describe('Visualización de página creada', function() {
	it('Visualización de página creada', function() {
		cy.visit('http://localhost:2368/nueva-pagina-creada/')
		cy.contains('Nueva página creada')
		cy.contains('Texto para ingresar en el párrafo')
	})
})

describe('Modificación página', function() {
	it('Modificación página de forma satisfactoria', function() {
		cy.visit('http://localhost:2368/ghost/#/signin')
		cy.get('form[id="login"]').find('input[name="identification"]').click().type("admin@test.com")
		cy.get('form[id="login"]').find('input[name="password"]').click().type("admin12345")
		cy.get('form[id="login"]').find('button[class="login gh-btn gh-btn-blue gh-btn-block gh-btn-icon ember-view"]').click()
		cy.wait(1990)
		cy.get('a[href="#/pages/"').click({force: true})
		createPageAndPublish('Página a modificar', 'Texto para ser modificado {enter} ')
		cy.get('a[href="#/pages/"').click({force: true})
		cy.get('main[role="main"]').contains('Página a modificar').click({force: true})
		cy.get('div[class="gh-publishmenu ember-view"]').click()
		cy.get('div[class="gh-publishmenu-radio-label"]').contains('Unpublished').click()
		cy.get('footer[class="gh-publishmenu-footer"]').find('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
		cy.get('main[role="main"]').find('textarea[placeholder="Page Title"]').click({force: true} ).type('{selectall} Titulo de página modificado {enter}')
		cy.get('main[role="main"]').find('div[data-placeholder="Begin writing your page..."]').click({force: true} ).type(' {selectall} Texto modificado en una página {enter} ')
		cy.get('div[class="gh-publishmenu ember-view"]').click()
		cy.get('footer[class="gh-publishmenu-footer"]').find('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
		cy.get('a[href="#/pages/"]').click({force: true})
		cy.contains('Titulo de página modificado')
	})
})

describe('Visualización de página modificada', function() {
	it('Visualización de página creada', function() {
		cy.visit('http://localhost:2368/pagina-a-modificar/')
		cy.contains('Titulo de página modificado')
		cy.contains('Texto modificado en una página')
	})
})
