const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    try {
        const { place, floor, networkType, issue, description, name, email, roomNo } = req.body;


        const query = `
            INSERT INTO network_issues
            (place, floor, network_type, issue, description, status, name, email, roomNo)
            VALUES (?, ?, ?, ?, ?, 'Pending', ?, ?, ?)
        `;

        db.pool.query(
            query,
            [place || null, floor || null, networkType, issue, description, name, email, roomNo || null],
            (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to register network issue'
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: 'Network issue registered successfully!',
                    issueId: result.insertId
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
});

module.exports = router;