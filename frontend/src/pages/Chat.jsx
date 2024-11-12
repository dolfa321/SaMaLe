import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import Sidebar from '../components/Sidebar';

const Chat = () => {
  const { user } = useContext(UserContext);
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
        const fetchChatHistory = async () => {
          try {
            const token = user.token;
            const response = await axios.get(`/chat/history/${chatId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setMessages(response.data.messages);
          } catch (error) {
            console.error('Error fetching chat history:', error);
          }
        };
  
        fetchChatHistory();
      }  }, [chatId,user]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = { text: message, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
        const token = user.token;

        const response = await axios.post(`/chat/generate/${chatId || 0}`, {
        message,
        userId: user.id, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      const { chatId: newChatId, messages: updatedMessages } = response.data;
      const modelResponse = updatedMessages[updatedMessages.length - 1];

      setMessages([...messages, newMessage, modelResponse]);

      if (!chatId) {
        setChatId(newChatId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
  };

  const handleNewChat = () => {
    setChatId(null);
    setMessages([]);
  };

  return (
    <div className="chat-page">
      <Sidebar onSelectChat={setChatId} onNewChat={handleNewChat}/>
      <div className="chat-container">
        <div className="chat-history">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;