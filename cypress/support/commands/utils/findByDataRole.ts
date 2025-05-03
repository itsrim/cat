const findByDataRole = (label: string, subject?: Cypress.Chainable) =>
  subject
    ? subject.find(`[data-role="${label}"]`)
    : cy.get(`[data-role="${label}"]`);

export default findByDataRole;
