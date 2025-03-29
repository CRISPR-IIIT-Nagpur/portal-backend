const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/', (req, res) => {

    db.query(
        'SELECT id, name, post, ongoing,resolved,total FROM network_employees',
        (err, result) => {
            try {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to fetch employees'
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