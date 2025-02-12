// cy.visit()
it('create new to do', () => {
    cy.visit('https://todolist.james.am/#/');

    cy.get('input.new-todo').type('long live the queen{enter}');

    // cy.get('ul.todo-list li')
    cy.contains('ul.todo-list li', 'long live the queen').should('be.visible');
    // cy.get('ul.todo-list li').invoke('text').should('contain', 'long live the queen') - problema išlieka kad jei teksto ma=iau įraši nei pati užduotis vis tiek randa info. 


});

it('Delete new to do', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('long live the queen{enter}');
    cy.get('input.new-todo').type('trinama užduotis{enter}');
    // cy.contains('ul.todo-list li', 'trinama užduotis').find('button').trigger('mouseover');-nesuveikė
    cy.contains('ul.todo-list li', 'trinama užduotis').find('button.destroy').invoke('show');
    cy.contains('ul.todo-list li', 'trinama užduotis').find('button.destroy').click();//sudėtingesnis bet tvarkingesnis variantas mygtuko paspaudimui
    // cy.contains('ul.todo-list li', 'trinama užduotis').find('button.destroy').click({ force: true });-paprsatesnis variantas mygtuko paspaudimui
cy.contains('ul.todo-list li', 'trinama užduotis').should('not.exist');
});

it('To do item edit', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('long live the queen{enter}');
    cy.get('input.new-todo').type('antra užduotis{enter}');
    cy.get('input.new-todo').type('trečia užduotis{enter}');
    cy.contains('ul.todo-list li', 'antra užduotis').dblclick();//redagavimas užduoties
    cy.contains('ul.todo-list li', 'antra užduotis').dblclick().find('input.edit').clear().type('2 užduotis redaguota{enter}');
    cy.contains('ul.todo-list li', '2 užduotis redaguota').should('be.visible');
});