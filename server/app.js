//app.js
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);

app.use(errorHandler);

module.exports = app;
