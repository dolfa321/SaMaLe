import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;

// Generate content using Gemini API with the entire chat history
export const generateContent = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const chat = await Chat.findOne(req.params.id);
    
      const contents = chat.messages.map(message => ({
        role: message.sender === 'user' ? 'user' : 'bot',
        text: message.text
      }));
  
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
        { contents: [{ parts: contents }] },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: `Failed to generate content: ${error.response ? error.response.data.error.message : error.message}` });
    }
  };

// Save a new message to the chat history
export const saveMessage = async (req, res) => {
    const { id, text, sender } = req.body;
  
    try {
      let chat = await Chat.findOne(id);
  
      if (!chat) {
        chat = new Chat({ user: userId, messages: [] });
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
    const { id } = req.params;
  
    try {
      const chat = await Chat.findOne(id);
  
      if (!chat) {
        return res.status(404).json({ message: 'Chat history not found' });
      }
  
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: `Failed to retrieve chat history: ${error.message}` });
    }
  };