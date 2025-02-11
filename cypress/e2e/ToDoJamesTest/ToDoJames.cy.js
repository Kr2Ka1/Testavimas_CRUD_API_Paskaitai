// cy.visit()
it('create new to do', () => {
    cy.visit('https://todolist.james.am/#/');

    cy.get('input.new-todo').type('long live the queen{enter}');
    





});