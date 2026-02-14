'use strict';

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table for Stroop Effect test results
db.serialize(() => {
    db.run('CREATE TABLE results (id INTEGER PRIMARY KEY, result TEXT, created_at TEXT)');
});

// Endpoint for submitting test results
app.post('/results', (req, res) => {
    const { result } = req.body;
    const createdAt = new Date().toISOString();

    db.run('INSERT INTO results (result, created_at) VALUES (?, ?)', [result, createdAt], function (err) {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        res.status(200).send({ id: this.lastID });
    });
});

// Email functionality using Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // replace with your email
        pass: 'your-email-password' // replace with your password
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
    const mailOptions = {
        from: 'your-email@gmail.com',
        to, 
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
