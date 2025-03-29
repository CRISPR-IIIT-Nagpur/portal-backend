const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received login request for:', username);

        // Hash the password using SHA-256
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const query = `SELECT * FROM users WHERE username = ?`;

        // Wrap db.query in a Promise
        const getUser = (query, values) => {
            return new Promise((resolve, reject) => {
                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Database error:', err);
                        reject(err);
                    } else {
                        console.log('Database result:', result); // Debugging
                        resolve(result);
                    }
                });
            });
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
                role: result[0].role
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            name: result[0].name,
            role: result[0].role
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
