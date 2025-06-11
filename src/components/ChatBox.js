import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: input });
      setMessages([...newMessages, { type: 'bot', text: response.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { type: 'bot', text: "Oops! Server error." }]);
    }

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} type={msg.type} text={msg.text} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
