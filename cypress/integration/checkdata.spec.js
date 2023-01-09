describe('The Ad Hoc Validate Check Data page', () => {
  beforeEach(() => {
    cy.visit('/validate');
  });
  it('has the expected header contents', () => {
    cy.get('h1').should('have.text', 'IATI Validator');
    cy.contains('Check data');
  });
  it('starts with correctly active/inactive buttons', () => {
    cy.contains('label', 'Browse').should('not.be.disabled');
    cy.contains('button', 'Upload').should('be.disabled');
    cy.contains('a', 'View Progress and Reports').parent().should('have.class', 'pointer-events-none');
  });
  it('allows you to upload a file for validation', () => {
    cy.get('input[type=file').selectFile('cypress/fixtures/iati-act-no-errors.xml', { force: true });
    cy.contains('iati-act-no-errors.xml');
    cy.contains('button', 'Upload').should('not.be.disabled').click();
    cy.contains('File(s) have been uploaded successfully');
    cy.contains('a', 'View Progress and Reports').parent().should('not.have.class', 'pointer-events-none');
    cy.contains('a', 'View Progress and Reports').click();
    cy.url().should('includes', '/validate/');
    cy.contains('Validation results');
    cy.contains('iati-act-no-errors.xml');
  });
  it('allows you to upload from URL for validation', () => {
    cy.contains('URL to a remote file').click();
    cy.get('#url').type(
      'https://raw.githubusercontent.com/IATI/IATI-Extra-Documentation/version-2.03/en/activity-standard/activity-standard-example-annotated.xml'
    );
    cy.contains('button', 'Fetch').should('not.be.disabled').click();
    cy.contains('File(s) have been uploaded successfully');
    cy.contains('a', 'View Progress and Reports').parent().should('not.have.class', 'pointer-events-none');
    cy.contains('a', 'View Progress and Reports').click();
    cy.url().should('includes', '/validate/');
    cy.contains('Validation results');
    cy.contains(
      'https://raw.githubusercontent.com/IATI/IATI-Extra-Documentation/version-2.03/en/activity-standard/activity-standard-example-annotated.xml'
    );
  });
});
