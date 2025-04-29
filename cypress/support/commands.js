import { faker } from '@faker-js/faker';

Cypress.Commands.add('loginApi', () => {
  cy.intercept('GET', '**/cupons').as('getCupons');
  Cypress.env('auth', {
    username: 'admin_ebac',
    password: '@admin!&b@c!2022',
    Authorization: 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy',
  });
});

Cypress.Commands.add('gerarCupomAleatorio', () => {
  return {
    code: faker.word.words(1) + faker.number.int({ min: 1, max: 100 }),
    amount: faker.finance.amount(5, 50, 2),
    discount_type: 'fixed_product',
    description: faker.lorem.sentence(),
  };
});