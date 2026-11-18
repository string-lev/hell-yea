const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-bubble">
        <strong>{isUser ? 'You' : 'Assistant'}</strong>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;