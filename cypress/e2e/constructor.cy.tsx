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
    cy.get('li:contains("Краторная булка N-200i")').within(() => {
      cy.get('button:contains(Добавить)').click();
    });
    cy.get(`li:contains(${sauce})`).within(() => {
      cy.get('button:contains(Добавить)').click();
    });
    cy.get(`li:contains(${main})`).within(() => {
      cy.get('button:contains(Добавить)').click();
    });
    cy.get('constructor-element_pos_top').contains(bun).should('exist');
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
  });
  it('should open modal', () => {
    cy.contains(ditals).should('not.exist');
    cy.contains('Мясо бессмертных моллюсков Protostomia').click();
  });
  it('should close modal', () => {
    cy.contains('Мясо бессмертных моллюсков Protostomia').click();
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
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.have.property('order');
        expect(interception.response.body.order).to.have.property('id');
        expect(interception.response.body.order).to.have.property(
          'ingredients'
        );
      } else {
        // Handle the case when interception.response is undefined
      }
    });
  });
});
