const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email parameter is required'
        });
    }

    console.log('Tracking complaints for email:', email);

    db.pool.query(
        'SELECT id, network_type, issue, description, status, reported_at FROM network_issues WHERE email = ?',
        [email],
        (err, result) => {
            try {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to fetch complaints'
                    });
                }

                return res.status(200).json({
                    result
                });
            } catch (error) {
                console.error('Server error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Server error occurred'
                });
            }
        }
    );
});

module.exports = router;