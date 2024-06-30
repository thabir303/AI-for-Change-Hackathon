const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


const chatModel = genAI.getGenerativeModel({ model: "gemini-pro" });

const chat = chatModel.startChat({
    history: [],
    generationConfig: {
        maxOutputTokens: 500,
    }
});

const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = await response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Error handling chat:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};



module.exports = { generateResponse,handleChat};
