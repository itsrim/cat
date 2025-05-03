import { CHAT_MODE } from '~constants/ChatMode';

import conversations from '../../../cypress/fixtures/api/conversations.json';

import ChatbotDiscussion from '.';
import i18n from '~/i18n';

const longMessage =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nafterislimit';

const slicedLongMessage =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N';

const expectedMessages = conversations[0].messages;
const conversationId = conversations[0].id;

const updateExpectedMessages = (message: string, owner: string) => {
  const newMessage = {
    id: '-1',
    owner: owner,
    idConversation: conversationId,
    createdAt: new Date().toDateString(),
    documentContent: null,
    idDocument: null,
    message: message
  };
  expectedMessages.push(newMessage);
};

const newUserMessage = 'test cypress';
const newAssistantMessage = 'test response cypress';

describe('ChatbotDiscussionRoom', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept(
      'POST',
      `https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations/${conversationId}/messages`,
      { statusCode: 200 }
    ).as('postConversationMessage');
  });

  it('should test a accounting question discussion room', () => {
    cy.mountWithProviders(
      <ChatbotDiscussion
        title="Question comptable"
        onClose={() => console.log('test')}
        mode={CHAT_MODE.QUESTION}
        setMode={() => console.log('set mode')}
        selectedConversation={conversations[0]}
        isHistoryRoom={false}
      />
    );

    cy.contains(
      'Je peux répondre à toutes vos questions en lien avec la comptabilité en me basant sur les normes comptables ANC 2022-06 et sur le plan comptable ANC 2022-06.'
    );
    cy.contains(i18n.t('accountingQuestion.suggestion1'));

    //test input
    cy.findByTestId('input-chatbot').should('exist');
    cy.findByTestId('input-chatbot').should('not.be.disabled');
    updateExpectedMessages(newUserMessage, 'user');
    updateExpectedMessages(newAssistantMessage, 'assistant');
    cy.intercept(
      'GET',
      `https://app.dev.myapi.tech/api/v1/starfleet/chatbot/conversations/${conversationId}/messages`,
      {
        body: expectedMessages
      }
    ).as('getConversationMessages');
    cy.findByTestId('input-chatbot').type(newUserMessage);
    cy.focused().type('{enter}');
    cy.wait('@postConversationMessage');

    cy.wait('@getConversationMessages');

    //check that the newly posted message is in the list of bubbles from the user
    cy.findAllByTestId('bubble-user').as('bubblesUser');
    cy.findAllByTestId('bubble-assistant').as('bubblesAssistant');

    const userMessages = expectedMessages.filter(
      (message) => message.owner === 'user'
    );

    const assistantMessages = expectedMessages.filter(
      (message) => message.owner === 'assistant'
    );

    cy.get('@bubblesUser').should('have.length', userMessages.length);
    cy.get('@bubblesAssistant').should(
      'have.length',
      assistantMessages.length + 1
    );
    cy.get('@bubblesUser').last().should('have.text', newUserMessage);
    cy.get('@bubblesAssistant').last().should('have.text', newAssistantMessage);
  });

  it('should limit text to 1000 characters', () => {
    cy.mountWithProviders(
      <ChatbotDiscussion
        title="Question comptable"
        onClose={() => console.log('test')}
        mode={CHAT_MODE.QUESTION}
        setMode={() => console.log('set mode')}
        selectedConversation={conversations[0]}
        isHistoryRoom={false}
      />
    );

    cy.contains(
      'Je peux répondre à toutes vos questions en lien avec la comptabilité en me basant sur les normes comptables ANC 2022-06 et sur le plan comptable ANC 2022-06.'
    );
    cy.contains(i18n.t('accountingQuestion.suggestion1'));

    cy.findAllByTestId('bubble-user').as('bubblesUser');
    cy.findByTestId('input-chatbot').type(longMessage);
    cy.focused().type('{enter}');
    cy.get('@bubblesUser').last().should('have.text', slicedLongMessage);
  });

  it('should display a conversation title with 60 characters at most', () => {
    const titleWithMoreThan60Char =
      'test of a title with much more than sixty characters to check title length limit';
    cy.mountWithProviders(
      <ChatbotDiscussion
        title={titleWithMoreThan60Char}
        onClose={() => console.log('test')}
        mode={CHAT_MODE.QUESTION}
        setMode={() => console.log('set mode')}
        selectedConversation={conversations[0]}
        isHistoryRoom={false}
      />
    );

    cy.findByTestId('discussion-title').as('discussionTitle');
    cy.get('@discussionTitle').should('not.have.text', titleWithMoreThan60Char);
    cy.get('@discussionTitle').should(
      'have.text',
      titleWithMoreThan60Char.slice(0, 60)
    );

    cy.contains(
      'Je peux répondre à toutes vos questions en lien avec la comptabilité en me basant sur les normes comptables ANC 2022-06 et sur le plan comptable ANC 2022-06.'
    );
    cy.contains(i18n.t('accountingQuestion.suggestion1'));
  });
});
