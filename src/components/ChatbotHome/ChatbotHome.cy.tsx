import ChatbotHome from '.';
import '../../i18n';

describe('ChatbotHome', () => {
  beforeEach(() => {
    cy.viewport(1200, 500);
    cy.intercept(
      `https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations`,
      {
        fixture: 'api/conversations.json'
      }
    ).as('getConversations');
  });

  it('Should display the Chatbot home', () => {
    cy.mountWithProviders(
      <ChatbotHome
        title={'Mon assistant'}
        onClose={() => console.log('test')}
        setMode={() => console.log('test')}
        setSelectedConversation={() => console.log('test')}
      />
    );

    cy.contains('Mon assistant');
    cy.contains('Créer une nouvelle discussion');
    cy.contains('Question comptable');
    cy.contains('Analyse balance ANC 2022-06');
    cy.contains('Reprendre une discussion');
    cy.contains("Consulter l'historique");
  });
});
