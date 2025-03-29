const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
    try {
        const { complaintId, employeeName } = req.body;
        console.log(complaintId, employeeName);
        query1 = 'update network_employees set ongoing=ongoing-1, resolved=resolved+1 where name = ?';
        query2 = 'update network_issues set status = "Completed" where id = ?';

        db.query( query1, [employeeName], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to resolve complaint'
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }


            db.query(query2, [complaintId], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to resolve complaint'
                    });
                }

                    return res.status(200).json({
                        success: true,
                        message: `Complaint resolved by ${employeeName} successfully!`,
                        complaintId: complaintId
                    });
                });
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