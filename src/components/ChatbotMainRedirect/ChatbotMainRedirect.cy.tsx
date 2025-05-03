import i18n from '~/i18n';
import ChatbotMainRedirect from '.';

describe('ChatbotMainRedirect', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept(
      `https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations`,
      {
        fixture: 'api/conversations.json'
      }
    ).as('getConversations');
  });

  it('Should display the Chatbot home', () => {
    cy.mountWithProviders(
      <ChatbotMainRedirect
        isOpen={true}
        onClose={() => console.log('on close')}
      />
    );

    //home page
    cy.contains('Créer une nouvelle discussion');
    cy.contains('Question comptable').as('goToQuestionComptable');
    cy.contains('Analyse balance ANC 2022-06');
    cy.contains('Reprendre une discussion');
    cy.contains("Consulter l'historique");

    //question comptable mode
    cy.get('@goToQuestionComptable').parent().click();
    cy.contains(
      'Je peux répondre à toutes vos questions en lien avec la comptabilité en me basant sur les normes comptables ANC 2022-06 et sur le plan comptable ANC 2022-06.'
    );
    cy.contains(i18n.t('accountingQuestion.suggestion1'));

    //back to home page
    cy.get('@goToQuestionComptable').click();
    cy.contains('Créer une nouvelle discussion');

    //ANC mode
    cy.contains('Analyse balance ANC 2022-06').click();
    cy.contains(
      'Je peux vous aider à identifier les comptes hors ANC 2022-06 et vous montrer quels sont les nouveaux comptes à utiliser.'
    );

    // //back to home page
    cy.contains('Chatbot ANC').click();
    // click on history
    cy.get('[data-id=historyButton]').should('exist');
    cy.get('[data-id=historyButton]').click();
  });
});
