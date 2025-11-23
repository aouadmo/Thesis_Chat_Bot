import React from 'react';
import { Message, Sender } from '../types';
import { BookOpen, ArrowRightCircle } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onSuggestionClick: (text: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestionClick }) => {
  const isBot = message.sender === Sender.BOT;

  // Simple markdown parser for bolding
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\$.*?\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-blue-900 font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        // Very basic math styling placeholder
        return <code key={index} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-pink-600">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${isBot ? 'bg-blue-600 mr-3' : 'bg-gray-200 ml-3'}`}>
          {isBot ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <div className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm ${
            isBot 
              ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-none' 
              : 'bg-blue-600 text-white rounded-tr-none'
          }`}>
            {message.isTyping ? (
               <div className="flex space-x-2 h-6 items-center">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
            ) : (
              <div className="whitespace-pre-wrap">{renderText(message.text)}</div>
            )}
          </div>

          {/* Citations & Follow-up */}
          {isBot && !message.isTyping && (
            <div className="mt-3 space-y-3">
              
              {/* Citations */}
              {message.citations && message.citations.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {message.citations.map((cit) => (
                    <div key={cit.id} className="flex items-center bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium cursor-help transition hover:bg-blue-100" title={`Go to ${cit.section}, Page ${cit.page}`}>
                      <BookOpen className="w-3 h-3 mr-1.5" />
                      <span>{cit.text} (p.{cit.page})</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Related Questions */}
              {message.relatedQuestions && message.relatedQuestions.length > 0 && (
                <div className="flex flex-col items-start gap-2 mt-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Suggested Follow-ups</span>
                  {message.relatedQuestions.map((q, idx) => (
                    <button 
                      key={idx}
                      onClick={() => onSuggestionClick(q)}
                      className="flex items-center text-left text-sm text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-full border border-gray-200 hover:border-blue-200 transition-all"
                    >
                      <ArrowRightCircle className="w-4 h-4 mr-2 text-blue-400" />
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <span className={`text-xs text-gray-400 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;