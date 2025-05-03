import { sortConversationsByMostRecent } from '../../components/ChatbotHistory/utils';


import { Conversation } from './types';

// const delayDebug = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getConversation = async (): Promise<Conversation[]> => {
  // await delayDebug(1000); // for debug
  const data = exempleData;
  const sorted = sortConversationsByMostRecent(data);
  if (!Array.isArray(sorted)) {
    throw new Error('getConversation format invalid');
  }
  return sorted;
};

const postConversation = async (type: string): Promise<Conversation> => {
  const body = { type };
  return {
    id: "11",
    type: "question_balance",
    userId: "6009",
    createdAt: "2025-04-18T10:22:40.427Z",
    updatedAt: "2025-04-18T10:22:40.427Z",
    messages: [
      {
        id: "5",
        idConversation: "11",
        owner: "user",
        message: "test",
        createdAt: "2025-04-18T10:57:13.494Z",
        documentContent: null,
        idDocument: null
      }
    ],
    title: "",
    closed: false
  };
};

const deleteConversation = async (conversationId: string) => {
  return 'ko'
};

export { getConversation, postConversation, deleteConversation };


const exempleData = [
  {
    "id": "11",
    "type": "question_balance",
    "userId": "6009",
    "createdAt": "2025-04-18T10:22:40.427Z",
    "updatedAt": "2025-04-18T10:22:40.427Z",
    "messages": [
      {
        "id": "5",
        "idConversation": "11",
        "owner": "user",
        "message": "test",
        "createdAt": "2025-04-18T10:57:13.494Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "6",
        "idConversation": "11",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-18T10:57:13.494Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "7",
        "idConversation": "11",
        "owner": "user",
        "message": "test",
        "createdAt": "2025-04-18T10:57:13.507Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "8",
        "idConversation": "11",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-18T10:57:13.507Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "9",
        "idConversation": "11",
        "owner": "user",
        "message": "test",
        "createdAt": "2025-04-18T10:57:13.685Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "10",
        "idConversation": "11",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-18T10:57:13.685Z",
        "documentContent": null,
        "idDocument": null
      }
    ],
    "title": "test",
    "closed": true
  },
  {
    "id": "27",
    "type": "question_balance",
    "userId": "6009",
    "createdAt": "2025-04-22T10:35:31.649Z",
    "updatedAt": "2025-04-22T10:35:31.649Z",
    "messages": [
      {
        "id": "39",
        "idConversation": "27",
        "owner": "user",
        "message": "test message",
        "createdAt": "2025-04-22T10:35:35.842Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "40",
        "idConversation": "27",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-22T10:35:35.842Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "133",
        "idConversation": "27",
        "owner": "user",
        "message": "TEST",
        "createdAt": "2025-04-22T13:39:14.755Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "134",
        "idConversation": "27",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-22T13:39:14.755Z",
        "documentContent": null,
        "idDocument": null
      }
    ],
    "title": "test message",
    "closed": false
  },
  {
    "id": "28",
    "type": "question_balance",
    "userId": "6009",
    "createdAt": "2025-04-22T10:43:25.726Z",
    "updatedAt": "2025-04-22T10:43:25.726Z",
    "messages": [
      {
        "id": "41",
        "idConversation": "28",
        "owner": "user",
        "message": "test message",
        "createdAt": "2025-04-22T10:43:32.221Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "42",
        "idConversation": "28",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-22T10:43:32.221Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "43",
        "idConversation": "28",
        "owner": "user",
        "message": "test message 2",
        "createdAt": "2025-04-22T10:43:40.044Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "44",
        "idConversation": "28",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-22T10:43:40.044Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "127",
        "idConversation": "28",
        "owner": "user",
        "message": "test message 3",
        "createdAt": "2025-04-22T13:33:30.245Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "128",
        "idConversation": "28",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-22T13:33:30.245Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "129",
        "idConversation": "28",
        "owner": "user",
        "message": "test TOTO",
        "createdAt": "2025-04-22T13:33:44.830Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "130",
        "idConversation": "28",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-22T13:33:44.830Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "131",
        "idConversation": "28",
        "owner": "user",
        "message": "test TOTO 2",
        "createdAt": "2025-04-22T13:37:56.268Z",
        "documentContent": null,
        "idDocument": null
      },
      {
        "id": "132",
        "idConversation": "28",
        "owner": "assistant",
        "message": "Success. Claude is disabled on this environment.",
        "createdAt": "2025-04-22T13:37:56.268Z",
        "documentContent": null,
        "idDocument": null
      }
    ],
    "title": "test message",
    "closed": true
  }
]
