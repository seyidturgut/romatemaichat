import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { Message } from '../types/chat';
import { ROMATEM_PAGES } from '../config/romatem';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export function ChatContainer({ messages, isLoading, onSendMessage }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col gap-4">
      <div className="flex-1 bg-white rounded-lg shadow-sm p-4 space-y-4 min-h-[400px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-center px-4 space-y-4">
            <div>
              <p className="mb-4">
                Romatem Fizik Tedavi ve Rehabilitasyon Merkezi hizmetleri hakkında sorularınızı yanıtlamak için buradayım.
              </p>
              <p className="mb-2">Örnek sorular:</p>
              <ul className="text-left space-y-2 text-blue-600">
                <li>• Bel ağrısı için hangi tedaviler uygulanıyor?</li>
                <li>• En yakın Romatem şubesi nerede?</li>
                <li>• Fizik tedavi seansları ne kadar sürüyor?</li>
                <li>• Online randevu nasıl alabilirim?</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} isTyping={isLoading && index === messages.length - 1} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="sticky bottom-4">
        <ChatInput 
          onSend={onSendMessage} 
          disabled={isLoading}
          placeholder="Romatem hizmetleri hakkında bir soru sorun..." 
        />
      </div>
    </main>
  );
}