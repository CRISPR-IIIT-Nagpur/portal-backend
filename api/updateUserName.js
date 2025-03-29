const express = require('express');
const router = express.Router();
const db = require('../db');

router.put('/', async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate request
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and userId are required'
            });
        }

        const updateName = (query, values) => {
            return new Promise((resolve, reject) => {
                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Database error:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        const query = 'UPDATE users SET name = ? WHERE email = ?';
        const result = await updateName(query, [name, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Name updated successfully'
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