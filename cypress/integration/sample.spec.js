describe('The Vue Template Homepage', () => {
  it('Shows the environment', () => {
    cy.visit('/');
    cy.contains('development');
  });
});
