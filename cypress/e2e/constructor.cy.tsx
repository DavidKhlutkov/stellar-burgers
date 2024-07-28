const ingredients = '[data-cy=burger-ingredients]';
const bun = '[data-cy=ingredient-bun]';
const sauce = '[data-cy=ingredient-sauce]';
const main = '[data-cy=ingredient-main]';
const testUrl = 'http://localhost:4000';
const closeModal = '[data-cy=modal-close-button]';
const submit = '[data-cy=order-submit]';

describe('Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.visit(testUrl);
    cy.wait('@ingredients');
  });
  it('should add ingredient to constructor', () => {
    cy.get(bun).contains('Добавить').click();
    cy.get(sauce).contains('Добавить').click();
    cy.get(main).contains('Добавить').click();
    cy.get(ingredients).contains('Краторная булка N-200i').should('exist');
    cy.get(ingredients)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });
});

describe('Test modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testUrl);
  });
  it('should open modal', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Биокотлета из марсианской Магнолии').click();
  });
  it('should close modal', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(closeModal).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Test order', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'userInfo.json' });
    cy.visit(testUrl);
  });
  window.localStorage.setItem('accessToken', 'token');
  it('should create an order', () => {
    cy.get(bun).contains('Добавить').click();
    cy.get(sauce).contains('Добавить').click();
    cy.get(main).contains('Добавить').click();
    cy.get(ingredients).contains('Краторная булка N-200i').should('exist');
    cy.get(ingredients)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('button[type=submit]').click();
    cy.wait('@order');
  });
});
