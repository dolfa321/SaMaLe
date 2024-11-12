import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from '../context/userContext';

const Sidebar = ({ onSelectChat , onNewChat }) => {
    const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {    

      try {
        const token = Cookies.get('token'); 
        const response = await axios.get(`/chat/historyUser/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [user, newChat]);

  const handleNewChat = () => {
    onNewChat();
    setNewChat(!newChat);
};

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    onSelectChat(chatId);
  };

  return (
      <div className="bg-[#b3d3e6] w-[15%] h-[calc(100vh-130px)] p-4 flex flex-col items-start">
        {/* Gumb za nov pogovor */}
        <div className="flex justify-center w-full">
          <button
              onClick={handleNewChat}
              className="w-[80%] bg-white text-black py-2 rounded-full mb-6 text-center font-semibold shadow-sm"
          >
            New chat
          </button>
        </div>

        {/* Naslov zgodovine */}
        <h2 className="text-white font-raleway font-semibold text-[25px] leading-[29px] uppercase mb-4">
          HISTORY
        </h2>

        {/* Seznam pogovorov */}
        <ul className="flex flex-col space-y-2 w-full">
          {chats.map((chat) => (
              <li
                  key={chat._id}
                  onClick={() => handleSelectChat(chat._id)}
                  className={`cursor-pointer text-sm px-4 py-2 ${
                      chat._id === selectedChatId
                          ? 'bg-white text-black rounded-full flex items-center justify-between shadow-md'
                          : 'text-white'
                  }`}
              >
                <span>{chat.messages.length > 0 ? chat.messages[0].text : 'No messages'}</span>
                {chat._id === selectedChatId && (
                    <span className="text-orange-500 ml-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7"
                >
                  <circle cx="5" cy="12" r="1.5"/>
                  <circle cx="12" cy="12" r="1.5"/>
                  <circle cx="19" cy="12" r="1.5"/>
                </svg>
              </span>
                )}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default Sidebar;