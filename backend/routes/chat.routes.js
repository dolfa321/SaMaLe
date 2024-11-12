import express from 'express';
import { generateContent, saveMessage, getChatHistory, getAllChatsForUser } from '../controllers/chat.controller.js';

const router  = express.Router();

router.post('/generate/:chatId', generateContent);
router.post('/save/:chatId', saveMessage);
router.get('/history/:chatId', getChatHistory);
router.get('/historyUser/:userId', getAllChatsForUser);

export default router;
