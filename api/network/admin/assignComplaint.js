const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.post('/', (req, res) => {
    try {
        const { complaintId, employeeId } = req.body;
        query1 = 'select name from network_employees where id = ?';
        query2 = 'update network_issues set status = "Assigned", assigned_to = ? where id = ?';
        query3 = 'update network_employees set ongoing = ongoing + 1 where id = ?';

        db.query( query1, [employeeId], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to assign complaint'
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }

            const employeeName = result[0].name;

            db.query(query2, [employeeName, complaintId], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to assign complaint'
                    });
                }

                db.query(query3, [employeeId], (err, result) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({
                            success: false,
                            message: 'Failed to update employee ongoing count'
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        message: `Complaint assigned to ${employeeName} successfully!`,
                        complaintId: complaintId
                    });
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