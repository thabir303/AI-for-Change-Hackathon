const express = require('express');
const bodyParser = require('body-parser');
const geminiRoutes = require('./routes/gemini');
const weatherRoutes = require('./routes/weatherRoutes');
const errorHandler = require('./middlewares/errorHandler');

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
app.use('/api/weather', weatherRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
