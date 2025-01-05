import React, { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export function ChatMessage({ message, isTyping = false }: ChatMessageProps) {
  const isBot = message.role === 'assistant';
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(!isBot);

  useEffect(() => {
    if (isBot && !isTypingComplete) {
      let index = 0;
      const text = message.content;
      const typingInterval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    }
  }, [message.content, isBot, isTypingComplete]);
  
  return (
    <div className={`flex gap-3 ${isBot ? 'bg-gray-50' : ''} p-4 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-1">
        <div 
          className="text-sm text-gray-800 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: isBot ? (isTypingComplete ? message.content : displayText).replace(/\n/g, '<br />') : message.content.replace(/\n/g, '<br />')
          }}
        />
        {isBot && !isTypingComplete && (
          <span className="inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1"></span>
        )}
      </div>
    </div>
  );
}