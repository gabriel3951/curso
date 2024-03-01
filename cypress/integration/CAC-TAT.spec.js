

describe('Central de Atendimento ao Cliente TAT', function() {
    
    //Será executado sempre este passo antes de qualquer caso de teste
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    //Verificar o título na aba do navegador
    it('Verificar o título na aba do navegador', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //Preencher os campos obrigatórios e submeter o formulário
    it('Preencher os campos obrigatórios e submeter o formulário', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gabriel.santos@cresol.com.br')
        cy.get('#open-text-area').type('Sem observações a mencionar.')
        cy.get('.button[type="submit"]').click() //Aqui ao invés de pegar pelo id do campo, foi pego pela classe button.

        cy.get('.success').should('be.visible') //Verificar se a mensagem de sucesso é exibida.
    })

    //Preencher os campos obrigatórios e submeter o formulário, com delay
    it.only('Preencher campos com delay', function(){
        const longText = 'Alguns minutos de estudo por dia valem a pena. Pesquisas mostram que os alunos que fazem do estudo um hábito têm maior probabilidade de alcançar suas metas. Reserve um tempo para estudar e receba lembretes usando seu programador de aprendizado.' //Variável do tipo 'const'.

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gabriel.santos@cresol.com.br')
        cy.get('#open-text-area').type(longText, {delay: 100}) //Setando o tempo de digitação de valor em um campo.
        cy.get('.button[type="submit"]').click() //Aqui ao invés de pegar pelo id do campo, foi pego pela classe button.

        cy.get('.success').should('be.visible')//Verificar se a mensagem de sucesso é exibida.
    })

    //Validar que o campo E-mail está inválido
    it('Validar que o campo E-mail está inválido', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gabriel.santoscresol.com.br')
        cy.get('#open-text-area').type('Sem observações a mencionar.')
        cy.get('.button[type="submit"]').click() //Aqui ao invés de pegar pelo id do campo, foi pego pela classe button.

        cy.get('.error').should('be.visible')//Verificar se a mensagem de erro é exibida.
    })

    //Validar se o campo Telefone aceita somente números
    it('Validar se o campo Telefone permanece em branco ao tentar digitar valor não numérico', function(){
        cy.get('#phone')
        .type('abcd') //Passar valor não numérico.
        .should('have.value', '') //Validar se o campo permenece em branco, indicando que não aceitou o valor.
    })

    //Validar que o telefone é obrigatório
    it('Validar que o telefone é obrigatório', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gabriel.santoscresol.com.br')
        cy.get('#phone-checkbox').click() //Validar que o checkbox foi clicado, tornado o campo obrigatório
        cy.get('#open-text-area').type('Sem observações a mencionar.')
        cy.get('.button[type="submit"]').click() //Aqui ao invés de pegar pelo id do campo, foi pego pela classe button.

        cy.get('.error').should('be.visible')//Verificar se a mensagem de erro é exibida.
    })

    //Preencher e limpar campos
    it('Preenchendo e limpando campos', function(){
        cy.get('#firstName')
        .type('Gabriel')
        .should('have.value', 'Gabriel')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Santos')
        .should('have.value', 'Santos')
        .clear()
        .should('have.value', '')
    })

    //Submeter um formulário com os campos obrigatórios em branco
    it('Submeter um formulário com os campos obrigatórios em branco', function(){
        cy.get('.button[type="submit"]').click() //Aqui ao invés de pegar pelo id do campo, foi pego pela classe button.

        cy.get('.error').should('be.visible') //Verificar se a mensagem de erro é exibida.
    })

    //Submeter o formulário usando comandos customizados
    it('Submeter o formulário usando comandos customizados', function(){
        cy.funcaoPrencherESubmeterFormulario()

        cy.get('.success').should('be.visible') //Verificar se a mensagem de sucesso é exibida.
    })

    //Identificar elementos na tela pelas características
    it('Identificar elementos na tela pelas características', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible') //Verificar se a mensagem de erro é exibida.
    })

    //Selecionando campos de seleção suspensa
    it('Selecionando valores de uma campo do tipo lista', function(){
        cy.get('select').select('Blog') //Pegando pelo texto do campo.
        cy.get('select').select('blog') //Pegando pelo atributo "value".
        cy.get('select').select(1) //Pegando pelo índice da lista.
    })

    it('Selecionando um valor da lista pelo texto', function(){
        cy.get('#product')
        .select('Blog')
        .should('have.value', 'blog') //Verificando o atributo value.
    })

    it('Selecionando um valor da lista pelo atributo value', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('Selecionando um valor da lista pelo índice', function(){
        cy.get('#product')
        .select(4)
        .should('have.value', 'youtube')
    })

    //Selecionando elementos do tipo radiobutton
    it('Selecionando elementos do tipo radiobutton', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check() //Marcando a opção
        .should('have.value', 'feedback')
    })

    it('Selecionando cada uma das opções', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3) //Verificar quantas opções há em tela.
        .each(function($radio){
            cy.wrap($radio).check() //Marcando cada uma das opções.
            cy.wrap($radio).should('be.checked')
        })

    })

    //Desmarcando elementos do tipo checkbox
    it('Desmarcando elementos do tipo checkbox', function(){
        cy.get('input=[type="checkbox"]')
        .check()
        .last() //Pegar o último elemento do tipo checkbox.
        .uncheck() //Desmarcar o checkbox selecionado.
        .should('not.be.checked')
    })

})