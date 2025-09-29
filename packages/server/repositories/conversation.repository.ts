const conversations = new Map<string, string>();

export const coversationRepository = {
  getLastResponseId: (conversationId: string) => {
    return conversations.get(conversationId) ?? null;
  },
  setLastResponseId: (conversationId: string, responseId: string) => {
    conversations.set(conversationId, responseId);
  },
};
