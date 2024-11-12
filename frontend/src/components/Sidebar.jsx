import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from '../context/userContext';

const Sidebar = ({ onSelectChat , onNewChat }) => {
    const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState(false);

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

  return (
    <div className="sidebar">
      <h2>Chat History</h2>
      <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id} onClick={() => onSelectChat(chat._id)}>
            {chat.messages.length > 0 ? chat.messages[0].text : 'No messages'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;