Cypress.Commands.add('funcaoPrencherESubmeterFormulario', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('gabriel.santos@cresol.com.br')
    cy.get('#open-text-area').type('Sem observações a mencionar.')
    cy.get('.button[type="submit"]').click() //Aqui ao invés de pegar pelo id do campo, foi pego pela classe button.
})