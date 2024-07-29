const ingredientsBurger = '[data-cy=burger-ingredients]';
const bun = 'Краторная булка N-200i';
const sauce = 'Соус Spicy-X';
const main = 'Мясо бессмертных моллюсков Protostomia';
const closeModal = '[data-cy=modal-close-button]';
const submit = '[data-cy=order-submit]';
const add = 'Добавить';
const ditals = 'Детали ингредиента';

describe('Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.visit('/');
    cy.wait('@ingredients');
  });
  it('should add ingredient to constructor', () => {
    cy.get(bun).contains(add).click();
    cy.get(sauce).contains(add).click();
    cy.get(main).contains(add).click();
    cy.get(ingredientsBurger).contains(bun).should('exist');
    cy.get(ingredientsBurger).contains(sauce).should('exist');
    cy.get(ingredientsBurger).contains(main).should('exist');
  });
});

describe('Test modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.visit('/');
    cy.wait('@ingredients');
  });
  it('should open modal', () => {
    cy.contains(ditals).should('not.exist');
    cy.contains('Биокотлета из марсианской Магнолии').click();
  });
  it('should close modal', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains(ditals).should('exist');
    cy.get(closeModal).click();
    cy.contains(ditals).should('not.exist');
  });
});

describe('Test order', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'userInfo.json' });
    cy.visit('/');
    cy.wait('@ingredients');
    window.localStorage.setItem('accessToken', 'token');
  });

  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it('should create an order', () => {
    cy.get(bun).contains(add).click();
    cy.get(sauce).contains(add).click();
    cy.get(main).contains(add).click();
    cy.get(ingredientsBurger).contains(bun).should('exist');
    cy.get(ingredientsBurger).contains(main).should('exist');
    cy.get(ingredientsBurger).contains(sauce).should('exist');
    cy.get('button[type=submit]').click();
    cy.wait('@order').then((interception) => {
      // Проверить данные в JSON-ответе
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.have.property('order');
      expect(interception.response.body.order).to.have.property('id');
      expect(interception.response.body.order).to.have.property('ingredients');
    });
  });
});
