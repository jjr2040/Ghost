var timeout = 1000;

describe('Ghost under monkeys', function(){
    it('visits Ghost, logs in, and survives monkeys', function(){
        cy.visit('http://localhost:2368/ghost/#/signin');
        cy.get('input[name="identification"]').click().type('se-mende@uniandes.edu.co');
        cy.get('input[name="password"]').click().type('Pruebas123');
        cy.get('.login').click()
        
        cy.wait(timeout);
        randomEvent(10);
    })
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomAlphaNumeric() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function randomEvent(eventsLeft) {
    for(var i = eventsLeft; i > 0; i--){
        var random = getRandomInt(0, 3);
        switch(random){
            case 0: //Click link al azar
                if(Cypress.$('a').length > 0){
                    cy.get('a').then(links => {
                        var randomLink = links.get(getRandomInt(0,links.length));
                        if(!Cypress.dom.isHidden(randomLink)){
                            cy.wrap(randomLink).click({force: true});
                        }
                        cy.wait(timeout);
                    });
                }
                else
                    i++;
                break;
            case 1: //Llenar un campo de texto al azar
                if(Cypress.$('input').length > 0){
                    cy.get('input').then(inputs => {
                        var randomInput = inputs.get(getRandomInt(0,inputs.length));
                        if(!Cypress.dom.isHidden(randomInput)){
                            cy.wrap(randomInput).type(randomAlphaNumeric(), {force: true});
                        }
                        cy.wait(timeout);
                    });
                }
                else
                    i++;
                break;
            case 2: //Seleccionar un combo al azar
                if(Cypress.$('select').length > 0){
                    cy.get('select').then(selects => {
                        if(selects.length > 0){
                            var randomSelect = selects.get(getRandomInt(0,selects.length));
                            if(!Cypress.dom.isHidden(randomSelect)){
                                var options = randomSelect.children;
                                var randomOption = options[getRandomInt(0,options.length)];
                                randomOption.click({force: true});
                            }
                            cy.wait(timeout);
                        }
                    });
                }
                else
                    i++;
                break;
            case 3: //Hacer click en un boton al azar
                if(Cypress.$('button').length > 0){
                    cy.get('button').then(buttons => {
                        var randomButton = buttons.get(getRandomInt(0,buttons.length));
                        if(!Cypress.dom.isHidden(randomButton)){
                            cy.wrap(randomButton).click({force: true});
                        }
                        cy.wait(timeout);
                    });
                }
                else
                    i++;
                break;
        }
    }
}