const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    try {
        console.log('Received request to update user name:', req.body);
        const { name, username } = req.body;
        console.log('Received request to update name for email:', username);
        if (!name || !username) {
            return res.status(400).json({
                success: false,
                message: 'Name and userId are required'
            });
        }

        const updateName = async (query, values) => {
            try {
                const [result] = await db.promisePool.query(query, values);
                return result;
            } catch (err) {
                console.error('Database error:', err);
                throw err;
            }
        };

        const query = 'UPDATE users SET name = ? WHERE username = ?';
        const result = await updateName(query, [name, username]);
        console.log('Database result:', result); // Debugging
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