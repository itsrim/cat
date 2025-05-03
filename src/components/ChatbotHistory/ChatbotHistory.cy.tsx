import ChatbotHistory from '.';
beforeEach(() => {
  cy.viewport(1200, 500);
  cy.intercept(
    'https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations',
    { fixture: 'api/conversations.json' }
  ).as('getConversations');
});

it('Should display the Chatbot history with mock data : that dislays 3 titles of conversations', () => {
  cy.then(() => {
    const setSelectedConversation = cy.stub().as('setSelectedConversation');

    cy.mountWithProviders(
      <ChatbotHistory
        title="Historique de discussion"
        onClose={() => console.log('test')}
        setMode={() => console.log('test')}
        setSelectedConversation={setSelectedConversation}
        setIsHistoryRoom={() => console.log('test')}
      />
    );

    cy.get('svg[data-testid="QuestionAnswerOutlinedIcon"]').should(
      'have.length',
      3
    );
    cy.get('[data-id="conversationHistoryTitle"]')
      .should('have.length', 3)
      .then((items) => {
        expect(items[0]).to.contain.text('test message');
        expect(items[1]).to.contain.text('test message');
        expect(items[2]).to.contain.text('test');
      });

    cy.get('[data-id="groupHistoryDate"]').should('have.length', 2);

    cy.get('[data-id="groupHistoryDate"]')
      .eq(0)
      .should('contain.text', '22 avril 2025');
    cy.get('[data-id="groupHistoryDate"]')
      .eq(1)
      .should('contain.text', '18 avril 2025');
  });
});
