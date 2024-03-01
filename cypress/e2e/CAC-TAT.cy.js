

describe('Central de Atendimento ao Cliente TAT', function() {
    
    const three_seconds_in_ms = 3000 
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
    it('Preencher campos com delay', function(){
        const longText = 'Alguns minutos de estudo por dia valem a pena. Pesquisas mostram que os alunos que fazem do estudo um hábito têm maior probabilidade de alcançar suas metas. Reserve um tempo para estudar e receba lembretes usando seu programador de aprendizado.' //Variável do tipo 'const'.

        cy.get('#firstName').type('Gabriel', {delay: 10})
        cy.get('#lastName').type('Santos', {delay: 10})
        cy.get('#email').type('gabriel.santos@cresol.com.br', {delay: 10})
        cy.get('#open-text-area').type(longText, {delay: 10}) //Setando o tempo de digitação de valor em um campo.
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
        cy.get('#phone-checkbox').check() //Validar que o checkbox foi clicado, tornado o campo obrigatório.
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
        cy.get('input[type="checkbox"]')
        .check()
        .last() //Pegar o último elemento do tipo checkbox.
        .uncheck() //Desmarcar o checkbox selecionado.
        .should('not.be.checked')
    })

    //Fazendo upload de arquivos
    it('Fazendo upload de arquivos', function(){
        cy.get('input[type="file"]') //Localizado um elemento do tipo file.
        .should('not.have.value')
        .selectFile('./cypress/fixtures/1.png') //Selecionando o arquivo de upload.
        .should(function($input){
            expect($input[0].files[0].name).to.equal('1.png')
        })
    })

    //Fazendo upload de arquivos (Drag and drop / arrastar e soltar)
    it('Fazendo upload de arquivos (Drag and drop / arrastar e soltar)', function(){
        cy.get('input[type="file"]') //Localizado um elemento do tipo file.
        .should('not.have.value')
        .selectFile('./cypress/fixtures/1.png', {action: 'drag-drop'}) //Selecionando o arquivo de upload.
        .should(function($input){
         expect($input[0].files[0].name).to.equal('1.png')
        })
    })

    //fixures
    it('Fixtures', function(){
        cy.fixture('1.png').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
         expect($input[0].files[0].name).to.equal('1.png')       

        })
    })

    //Interagindo com link que abrem em nova aba
    it('Verificando se um link será aberto em nova aba, sem clicar', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Removendo o atributo target', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target') //Removendo o atributo.
        .click()
        
        cy.contains('Talking About Testing').should('be.visible') //Validando o conteúdo da página aberta.
    })

    //Controlando o relógio do navegador
    it('Controlando o relógio do navegador', function(){
        cy.clock()

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gabriel.santos@cresol.com.br')
        cy.get('#open-text-area').type('Sem observações a mencionar.', {delay: 3})
        cy.get('.button[type="submit"]').click() //Aqui ao invés de pegar pelo id do campo, foi pego pela classe button.

        cy.get('.success').should('be.visible') //Verificar se a mensagem de sucesso é exibida.

        cy.tick(three_seconds_in_ms) //Variável referente aos segundos.

        cy.get('.success').should('not.be.visible')        
    })

    //Funções do Loadash
    Cypress._.times(5, function(){
        it('Excutando um mesmo teste diversas vezes', function(){
            cy.visit('./src/privacy.html')
            cy.contains('Talking About Testing').should('be.visible')
        })

    })

    //Exibir e ocultar mensagens usando o .invoke
    it('Exibir e ocultar mensagens usando o .invoke', function(){
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    //Preencher um campo usando o .invoke
    it('Preencher um campo usando o .invoke', function(){
        const longText2 = Cypress._.repeat('Gabriel Santos ', 10) //Repetindo 10x o meu nome

        cy.get('#open-text-area')
        .invoke('val', longText2) //Setando a variável
        .should('have.value', longText2)
    })

    //Usando o cypress request
    it('Usando o cypress request', function(){
        cy.request('google.com.br')
        .should(function(response){
         console.log(response)
         const {status, statusText} = response
         expect(statusText).to.equal('OK')
         expect(status).to.equal(200)
        })
    })

    //Achando o gato no html
    it('Achando o gato', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
        cy.get('#title')
        .invoke('text', 'TITULO DE TESTE') //Substituindo o parâmetro título

    })
   

})