import React, { useState, useRef, useEffect } from 'react';
import { Message, Sender, ComplexityLevel } from '../types';
import ChatMessage from './ChatMessage';
import { Send, Sparkles, GraduationCap } from 'lucide-react';
import { processMessage } from '../services/chatService';
import { INITIAL_GREETING, SUGGESTED_QUESTIONS } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      text: INITIAL_GREETING,
      sender: Sender.BOT,
      timestamp: new Date(),
      relatedQuestions: SUGGESTED_QUESTIONS
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [complexity, setComplexity] = useState<ComplexityLevel>('simple');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isProcessing) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    // Add typing indicator
    const typingId = 'typing-' + Date.now();
    setMessages(prev => [...prev, {
        id: typingId,
        text: '',
        sender: Sender.BOT,
        timestamp: new Date(),
        isTyping: true
    }]);

    try {
      const botResponse = await processMessage(text, complexity);
      setMessages(prev => prev.filter(m => m.id !== typingId).concat(botResponse));
    } catch (error) {
      console.error(error);
      // Remove typing indicator
      setMessages(prev => prev.filter(m => m.id !== typingId));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative overflow-hidden">
      
      {/* Header Overlay for Complexity Toggle */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-500">
          Physics Mode:
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setComplexity('simple')}
            className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              complexity === 'simple' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Sparkles className="w-3 h-3 mr-1.5" />
            Intuitive
          </button>
          <button
            onClick={() => setComplexity('rigorous')}
            className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              complexity === 'rigorous' 
                ? 'bg-white text-purple-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <GraduationCap className="w-3 h-3 mr-1.5" />
            Rigorous
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-20 scrollbar-hide">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              onSuggestionClick={(t) => handleSendMessage(t)} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 md:p-6">
        <div className="max-w-3xl mx-auto relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about cryogenic effects, numerical stability, or model equations..."
            className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none shadow-inner"
            rows={1}
            style={{ minHeight: '60px' }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isProcessing}
            className={`absolute right-2 top-2 bottom-2 aspect-square rounded-xl flex items-center justify-center transition-all ${
              inputValue.trim() && !isProcessing
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400">
                AI assumes the persona of Mohamed Aouad's Thesis (2022). Content is generated based on metadata.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;