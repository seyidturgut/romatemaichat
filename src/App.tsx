import React from 'react';
import { Stethoscope } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { useAIChat } from './hooks/useAIChat';
import { Header } from './components/Header';
import { ChatContainer } from './components/ChatContainer';

export default function App() {
  const { messages, isLoading, sendMessage } = useAIChat();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <ChatContainer 
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
      />
    </div>
  );
}