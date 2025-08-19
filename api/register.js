const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    try {
        const { username, password, name, role } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'username and password required' });
        }

        const hashed = crypto.createHash('sha256').update(password).digest('hex');

        // Check existing
        const [existing] = await db.promisePool.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const insertQuery = 'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)';
        await db.promisePool.query(insertQuery, [username, hashed, name || null, role || 'user']);

        return res.status(201).json({ success: true, message: 'User created' });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
