// import { serviceChatbot } from '../../helpers/api';

import { Message } from './types';

const getConversationMessages = async (
  conversationId: string
): Promise<Message[]> => {
  const { data } = await serviceChatbot.makeApiCall(
    `/chatbot/conversations/${conversationId}/messages`,
    'get'
  );
  return data;
};

const postConversationMessage = async (
  conversationId: string,
  message: string
) => {
  const formData = new FormData();
  formData.append('message', message);

  try {
    const data = await serviceChatbot.makeApiCall(
      `/chatbot/conversations/${conversationId}/messages`,
      'post',
      {},
      formData
    );
    return data;
  } catch (e) {
    console.error(e);
    return e.response.data;
  }
};

export { getConversationMessages, postConversationMessage };
