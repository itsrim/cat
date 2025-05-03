import { Message } from '~services/message/types';

export type Conversation = {
  id: string;
  type: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  title: string;
  closed: boolean;
};

export type ConversationMessage = {
  owner: string;
  message: string;
  document?: null;
};

export type ErrorResponse = {
  code: string;
  message: string;
  details: {
    url: string;
    method: string;
    requestedAt: string;
  };
};
