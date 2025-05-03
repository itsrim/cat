import { useState } from 'react';

import { CHAT_MODE } from '~constants/ChatMode';

import InputChatbotField from '.';

beforeEach(() => {
  cy.viewport(1200, 800);

  cy.intercept(
    'GET',
    'https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations/11/messages',
    { fixture: 'api/messages.json' }
  ).as('getConversationMessages');

  cy.intercept(
    'POST',
    'https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations/11/messages',
    { statusCode: 200, body: { message: 'test' } }
  ).as('postConversationMessage');
});

it('Should type input, show loader, send message, clear input, and display updated messages', () => {
  const message = 'test';

  const InputChatbotFieldComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
      <InputChatbotField
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setMessages={cy.stub()}
        mode={CHAT_MODE.QUESTION}
        handleSendConversationMessage={async (message: string) => {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          await fetch(
            'https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations/11/messages',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message })
            }
          );
          await fetch(
            'https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations/11/messages'
          );
        }}
        conversationId={'11'}
      />
    );
  };
  cy.mountWithProviders(<InputChatbotFieldComponent />);

  // Type message into input and press Enter, check loader instead of arrow send icon
  cy.get('[data-id="inputChatbotField"]').type(`${message}{enter}`);
  cy.get('[data-id="loaderPostMessage"]').should('exist');
  cy.get('[data-id="arrowSendMessageIcon"]').should('not.exist');

  cy.wait('@postConversationMessage');
  cy.wait('@getConversationMessages');

  // checked that no loader and arrow send icon is back after POST/GET
  cy.get('[data-id="loaderPostMessage"]').should('not.exist');
  cy.get('[data-id="arrowSendMessageIcon"]').should('exist');
});
