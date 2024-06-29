const express = require('express');
const bodyParser = require('body-parser');
const geminiRoutes = require('./routes/gemini');
const cors = require('cors'); // Import cors


const app = express();
const port = process.env.PORT || 3000;
app.use(cors()); // Use cors middleware

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json({
        message: "You are a mofiz"
    });
});

app.use("/api/gemini", geminiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
