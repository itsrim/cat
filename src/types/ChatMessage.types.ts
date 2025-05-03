export type ChatMessage = {
  id: number;
  userId: string;
  content: string;
  timestamp: string;
  type: string; // "text" | "image"
  isMine: boolean;
  chatbotMode: string;
  room: number | string;
  counter: number;
};

export type globalCounterMessage = {
  counter: number;
};
