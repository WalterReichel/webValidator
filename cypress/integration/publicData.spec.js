describe('The Ad Hoc Validate Check Data page', () => {
  beforeEach(() => {
    cy.visit('/organisations');
  });
  it('has the expected header contents', () => {
    cy.get('h1').should('have.text', 'IATI Validator').siblings().should('have.text', 'Public data viewer');
  });
});
