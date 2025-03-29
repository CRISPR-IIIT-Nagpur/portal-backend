const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    try {
        const { url, purpose, name} = req.body;
        console.log('Received request to unblock website:', url, purpose, name);

        const query = `INSERT INTO websites(name, url, purpose) VALUES (?, ?, ?)`;
        db.query(
            query,
            [name, url, purpose],
            (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to register unblock request'
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Unblock request registered successfully!',
                });
            }
        );
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error occurred'
        });
    }
}
);

module.exports = router;