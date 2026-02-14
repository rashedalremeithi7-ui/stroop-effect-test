const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes for language selection
app.get('/select-language-ar-en', (req, res) => {
    res.send('Welcome to the bilingual Stroop test - Arabic to English');
});

app.get('/select-language-en-ar', (req, res) => {
    res.send('Welcome to the bilingual Stroop test - English to Arabic');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});