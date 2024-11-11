import express from 'express';
import { generateContent, saveMessage, getChatHistory } from '../controllers/chat.controller.js';

const router  = express.Router();

router.post('/generate', generateContent);
router.post('/save/:id', saveMessage);
router.get('/history/:id', getChatHistory);

export default router;
