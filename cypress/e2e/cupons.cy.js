import { faker } from '@faker-js/faker';

const baseUrl = 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3/coupons';
const auth = {
  username: Cypress.env('apiUser'),
  password: Cypress.env('apiPass')
};

describe('API Cupom - Loja EBAC', () => {
  it('Deve listar os cupons existentes', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      auth
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Total de cupons listados:', response.body.length);
    });
  });

  it('Deve criar um novo cupom com dados fake', () => {
    const fakeCouponCode = faker.string.alphanumeric(8);
    
    cy.request({
      method: 'POST',
      url: baseUrl,
      auth,
      body: {
        code: fakeCouponCode,
        amount: '10.00',
        discount_type: 'fixed_product',
        description: 'Cupom de teste'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('amount', '10.00');
    });
  });
});
