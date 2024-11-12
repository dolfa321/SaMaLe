import axios from 'axios';
import dotenv from 'dotenv';
import Chat from '../models/chat.model.js';
import mongoose from 'mongoose';

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;

// Generate content using Gemini API with the entire chat history
export const generateContent = async (req, res) => {
    const { chatId } = req.params;
    const { message, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(chatId) && chatId !== '0') {
      return res.status(400).json({ message: 'Invalid chat ID' });
    }

    try {
        let chat;

        if (chatId == 0) {
            chat = new Chat({ user: userId, messages: [{ text: message, sender: 'user' }] });;
        }else{    
            chat = await Chat.findById(chatId);
            chat.messages.push({ text: message, sender: 'user' });
        }

      await chat.save();

      const contents = chat.messages.map(msg => ({
        parts: [{ text: msg.text }],
        role: msg.sender === 'user' ? 'user' : 'model'
      }));
  
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
        { contents },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
    
      const modelResponse = response.data.candidates[0].content.parts[0].text;

      chat.messages.push({ text: modelResponse, sender: 'model' });

      await chat.save();

      res.status(200).json({
        chatId: chat._id,
        messages: chat.messages,
        modelResponse: response.data
      });
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: `Failed to generate content: ${error.response ? error.response.data.error.message : error.message}` });
    }
  };

// Save a new message to the chat history
export const saveMessage = async (req, res) => {
    const { chatId, text, sender } = req.body;
  
    try {
      let chat = await Chat.findById(chatId);
  
      if (!chat) {
        chat = new Chat({ messages: [] });
      }
  
      chat.messages.push({ text, sender });
      await chat.save();
  
      res.status(201).json(chat);
    } catch (error) {
      res.status(500).json({ message: `Failed to save message: ${error.message}` });
    }
  };

// Retrieve chat history for a user
export const getChatHistory = async (req, res) => {
    const { chatId } = req.params;
  
    try {
      const chat = await Chat.findById(chatId);
  
      if (!chat) {
        return res.status(404).json({ message: 'Chat history not found' });
      }
  
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: `Failed to retrieve chat history: ${error.message}` });
    }
  };

// Retrieve all chats for a user
export const getAllChatsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({ user: userId });

    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: 'No chats found for this user' });
    }

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve chats: ${error.message}` });
  }
};