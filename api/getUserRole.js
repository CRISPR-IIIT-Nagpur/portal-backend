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
    
    db.pool.query("SELECT ROLE FROM users WHERE username = ?", [username], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'Database error occurred'
            });
        }
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const role = result[0].ROLE;
        console.log('User role:', role);
        return res.status(200).json({
            success: true,
            role: role
        });
    });
    }
    catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
    }
}
);

module.exports = router;