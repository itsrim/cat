const findByAriaLabel = (label: string, subject?: Cypress.Chainable) =>
  subject
    ? subject.find(`[aria-label="${label}"]`)
    : cy.get(`[aria-label="${label}"]`);

export default findByAriaLabel;
