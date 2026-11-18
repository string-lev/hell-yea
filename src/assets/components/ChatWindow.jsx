import { useEffect, useRef, useState } from 'react';
import ChatInput from './chat-input';
import ChatMessage from './chat-message';
import { askAI } from '../../services/gemini';
import './chatbot.css';

const initialMessages = [
  {
    role: 'assistant',
    content: 'Hello! I am your AI assistant. Ask me anything.',
  },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    if (!text) {
      return;
    }

    const userMessage = { role: 'user', content: text };
    const conversation = [...messages, userMessage];

    setMessages(conversation);
    setIsLoading(true);

    try {
      const aiReply = await askAI(conversation);
      setMessages([...conversation, { role: 'assistant', content: aiReply }]);
    } catch (error) {
      setMessages([
        ...conversation,
        {
          role: 'assistant',
          content:
            error instanceof Error
            ? `Service error: ${error.message}`
            : 'Sorry, I could not contact the requested service right now.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="chat-window-card">
      <div className="chat-window-header">
        <div>
          <p className="panel-eyebrow">CONVERSATION</p>
          <h2>AI Chat</h2>
          <p>Ask a question or start a conversation.</p>
        </div>
        <span className="panel-status"><span className="status-dot" />Ready</span>
      </div>

      <div className="chat-window-messages">
        {messages.map((message, index) => (
          <ChatMessage key={`${message.role}-${index}`} message={message} />
        ))}

        {isLoading && (
          <div className="chat-message assistant">
            <div className="chat-bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </section>
  );
};

export default ChatWindow;
