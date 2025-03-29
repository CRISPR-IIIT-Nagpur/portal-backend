const express = require('express');
const app = express();
const cors = require("cors");
const port = 7979;
const networkComplaintRouter = require('./api/network/createComplaint.js');
const networkComplaintTrackRouter = require('./api/network/trackComplaint.js');
const networkUnblockRouter = require('./api/network/unblockWebsites.js');
const networkAdminComplaintRouter = require('./api/network/admin/complaints.js');
const networkAdminEmployeeRouter = require('./api/network/admin/employees.js');
const networkAdminAssignComplaintRouter = require('./api/network/admin/assignComplaint.js');
const networkAdminEmployeeComplaintRouter = require('./api/network/employeeComplaint.js');
const networkResolveComplaintRouter = require('./api/network/resolveComplaint.js');
mysqlcon = require('./db.js');

app.use(cors());
app.use(express.json());
app.use('/api/network/registerComplaint', networkComplaintRouter);
app.use('/api/network/trackComplaint', networkComplaintTrackRouter);
app.use('/api/network/unblockWebsites', networkUnblockRouter);
app.use('/api/network/admin/complaints', networkAdminComplaintRouter);
app.use('/api/network/admin/employees', networkAdminEmployeeRouter);
app.use('/api/network/admin/assignComplaint', networkAdminAssignComplaintRouter);
app.use('/api/network/employeeComplaint', networkAdminEmployeeComplaintRouter);
app.use('/api/network/resolveComplaint', networkResolveComplaintRouter);
app.use('/login', require('./api/login.js'));
app.use('/updateUserName', require('./api/updateUserName.js'));
app.get('/', (req, res) => {
    res.send('Mysql x express running!');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});