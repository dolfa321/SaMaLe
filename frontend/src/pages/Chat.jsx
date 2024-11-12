import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import Sidebar from '../components/Sidebar';

import logotip from '../assets/logotip.png';

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
      <div className="chat-page flex w-full h-[calc(100vh-130px)]">
        {/* Sidebar na levi strani*/}
        <Sidebar className="w-[10%]" onSelectChat={setChatId} onNewChat={handleNewChat}/>

        {/* Glavni chat container na desni strani */}
        <div className="flex flex-col w-[90%] ">


          <div className="chat-history flex-1 overflow-y-auto p-4 px-40 py-10 bg-white rounded-t-lg">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex items-start space-x-4 mb-4 ${msg.sender === 'model' ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Prikaz logotipa samo za sporočila umetne inteligence */}
                  {msg.sender === 'model' && (
                      <img
                          src={logotip}
                          alt="Bot Logo"
                          className="w-12 h-12 rounded-full"
                      />
                  )}
                  <div
                      className={`chat-message p-3 rounded-lg ${msg.sender === 'model' ? 'bg-red-200 text-left' : 'bg-blue-200 text-right'}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: '22px',
                        color: '#000000',
                      }}
                  >
                    {msg.text}
                  </div>
                </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="flex justify-center pb-10 py-5">
            <div className="chat-input-container flex items-center w-1/2 p-2 bg-[#3D5A80] rounded-full shadow-md">
              <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Let me know"
                  className="chat-input flex-1 p-2 text-white bg-[#3D5A80] placeholder-white rounded-l-full focus:outline-none"
              />
              <button
                  onClick={handleSendMessage}
                  className="p-2 bg-orange-500 rounded-full ml-2"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Chat;