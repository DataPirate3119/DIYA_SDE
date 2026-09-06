const express = require('express');
const db = require('./database');
const app = express();

app.use(express.json());

const PORT = 3000;

// 1. Student Voices (Tips) Endpoints

app.post('/tips', (req, res) => {
    const { message } = req.body;
    
    // Validate input
    if (!message || message.trim() === '') {
        return res.status(400).json({ success: false, error: "Message cannot be empty." });
    }

    const createdAt = new Date().toISOString().split('T')[0];
    
    db.run(`INSERT INTO tips (message, createdAt) VALUES (?, ?)`, [message, createdAt], function(err) {
        if (err) return res.status(500).json({ success: false, error: "Database error." });
        res.status(201).json({ success: true, message: "Tip submitted successfully." });
    });
});

app.get('/tips', (req, res) => {
    db.all(`SELECT * FROM tips`, [], (err, rows) => {
        if (err) return res.status(500).json({ success: false, error: "Database error." });
        res.status(200).json(rows);
    });
});

// 2. Mood Check-In Endpoints

app.post('/moods', (req, res) => {
    const { mood } = req.body;
    const allowedMoods = ['good', 'okay', 'meh', 'stressed', 'overwhelmed'];

    // Validate input
    if (!mood || !allowedMoods.includes(mood.toLowerCase())) {
        return res.status(400).json({ 
            success: false, 
            error: "Invalid mood. Allowed values: good, okay, meh, stressed, overwhelmed." 
        });
    }

    const date = new Date().toISOString().split('T')[0];
    
    db.run(`INSERT INTO moods (mood, date) VALUES (?, ?)`, [mood.toLowerCase(), date], function(err) {
        if (err) return res.status(500).json({ success: false, error: "Database error." });
        res.status(201).json({ success: true, message: "Mood recorded successfully." });
    });
});

app.get('/moods', (req, res) => {
    db.all(`SELECT * FROM moods`, [], (err, rows) => {
        if (err) return res.status(500).json({ success: false, error: "Database error." });
        res.status(200).json(rows);
    });
});

// 3. Resources Endpoints

app.get('/resources', (req, res) => {
    const { category } = req.query;
    
    if (category) {
        db.all(`SELECT * FROM resources WHERE category = ?`, [category.toLowerCase()], (err, rows) => {
            if (err) return res.status(500).json({ success: false, error: "Database error." });
            res.status(200).json(rows);
        });
    } else {
        db.all(`SELECT * FROM resources`, [], (err, rows) => {
            if (err) return res.status(500).json({ success: false, error: "Database error." });
            res.status(200).json(rows);
        });
    }
});

// Handle missing routes
app.use((req, res) => {
    res.status(404).json({ success: false, error: "Endpoint not found." });
});

app.listen(PORT, () => {
    console.log(`Manthan Backend API running on http://localhost:${PORT}`);
});
