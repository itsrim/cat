const interceptApiRoutes = () => {
  cy.intercept('https://ws.*.myapi.tech/**', {
    body: []
  });

  cy.intercept('https://app.*.myapi.tech/**', {
    body: []
  });

  cy.intercept('https://ws.*.myapi.tech/rights', {
    fixture: 'api/rights.json'
  }).as('getRights');

  cy.intercept('https://ws.*.myapi.tech/society?*', {
    fixture: 'api/society.json'
  }).as('getSociety');
};

export default interceptApiRoutes;
