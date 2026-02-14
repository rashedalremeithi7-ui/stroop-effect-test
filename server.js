const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index-ar-en.html'));
});

app.get('/en-ar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index-en-ar.html'));
});

app.get('/ar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index-ar.html'));
});

app.get('/en', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index-en.html'));
});

app.post('/send-email', (req, res) => {
  res.json({ message: 'Email sent' });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
