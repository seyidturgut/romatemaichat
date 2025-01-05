import { useState } from 'react';
import { AIService } from '../services/aiService';
import type { Message, ChatState } from '../types/chat';

const aiService = new AIService();

export function useAIChat() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const response = await aiService.sendMessage(content);
      
      const botMessage: Message = {
        role: 'assistant',
        content: response,
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Yanıt alınamadı:', error);
      setChatState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    sendMessage,
  };
}