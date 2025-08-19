const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    try {
        const { email, name } = req.body || {};
        if (!email || !name) {
            return res.status(400).json({ success: false, message: 'email and name are required' });
        }

        const updateQuery = 'UPDATE users SET name = ? WHERE username = ?';
        const [result] = await db.promisePool.query(updateQuery, [name, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, message: 'Name updated' });
    } catch (err) {
        console.error('Error updating name:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
