import ChatbotWidget from '.';

describe('ChatbotWidget', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept(
      `https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations`,
      {
        fixture: 'api/conversations.json'
      }
    ).as('getConversations');
  });

  it('should open and close chatbot', () => {
    cy.mountWithProviders(<ChatbotWidget />);

    // check widget (FAB floating action button) is present
    cy.get('[data-id=chatbotWidget]').should('exist');

    // open chatbot
    cy.get('[data-id=chatbotWidget]').click();

    // widget disappears
    cy.get('[data-id=chatbotWidget]').should('not.exist');

    // chatbot home opened, @getConversations necessary
    cy.get('[data-id=closeChatbotDrawer]').should('exist');

    // Click on  close icone de fer
    cy.get('[data-id=closeChatbotDrawer]').last().click();

    //  widget should be back
    cy.get('[data-id=closeChatbotDrawer]').should('not.exist');
    cy.get('[data-id=chatbotWidget]').should('exist');
  });
});
