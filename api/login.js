const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body || {};
        console.log('Received login request for:', username);

        if (!username || !password) {
            console.log('Missing username or password in request');
            return res.status(400).json({ success: false, message: 'username and password required' });
        }

        const hashedPassword = crypto.createHash('sha256').update(String(password)).digest('hex');

        const query = `SELECT * FROM users WHERE username = ?`;

        // Simplified getUser function using promisePool
        const getUser = async (query, values) => {
            try {
                const [result] = await db.promisePool.query(query, values);
                console.log('Database result:', result); // Debugging
                return result;
            } catch (err) {
                console.error('Database error:', err);
                throw err;
            }
        };

        const result = await getUser(query, [username]); // Await database query
        if (!result || result.length === 0) {
            console.log('User not found:', username);
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        console.log('User found:', result[0]);

        // Check password
        if (result[0].password !== hashedPassword) {
            console.log('Incorrect password for:', username);
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        console.log('Login successful:', username);

        if (!result[0].name) {
            return res.status(206).json({
                success: true,
                requiresProfile: true,
                message: 'Login successful, but profile incomplete',
                userId: result[0].id,
                role: result[0].role,
                email: result[0].username
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            name: result[0].name,
            role: result[0].role,
            email: result[0].username
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error occurred'
        });
    }
});

module.exports = router;
