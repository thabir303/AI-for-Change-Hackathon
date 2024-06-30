const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/gemini');

router.post('/generate', geminiController.generateResponse);
router.post('/chat', geminiController.handleChat);

module.exports = router;
