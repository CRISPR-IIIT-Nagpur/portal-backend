const express = require('express');
const app = express();
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const port = 7979;
const networkComplaintRouter = require('./api/network/createComplaint.js');
const networkComplaintTrackRouter = require('./api/network/trackComplaint.js');
const networkUnblockRouter = require('./api/network/unblockWebsites.js');
const networkAdminComplaintRouter = require('./api/network/admin/complaints.js');
const networkAdminEmployeeRouter = require('./api/network/admin/employees.js');
const networkAdminAssignComplaintRouter = require('./api/network/admin/assignComplaint.js');
const networkAdminEmployeeComplaintRouter = require('./api/network/employeeComplaint.js');
const networkResolveComplaintRouter = require('./api/network/resolveComplaint.js');
const getUserRoleRouter = require('./api/getUserRole.js');
const registerRouter = require('./api/register.js');
const updateNameRouter = require('./api/updateName.js');
mysqlcon = require('./db.js');

// API call counter
const apiCalls = {
    total: 0,
    endpoints: {}
};

// API call counter middleware
const countApiCalls = (req, res, next) => {
    apiCalls.total++;

    const endpoint = req.originalUrl || req.url;
    if (!apiCalls.endpoints[endpoint]) {
        apiCalls.endpoints[endpoint] = 0;
    }
    apiCalls.endpoints[endpoint]++;

    next();
};

// Apply the counter middleware
app.use(countApiCalls);

// Create a rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests, please try again later.'
    },
    // This callback runs on each request and can be used to track limits
    handler: (req, res, next, options) => {
        console.log(`Rate limit exceeded for ${req.ip} on ${req.originalUrl}`);
        res.status(options.statusCode).send(options.message);
    }
});

app.use('/api', limiter);

app.use(cors());
app.use(express.json());

// Route to display API call statistics
app.get('/api/stats', (req, res) => {
    const stats = {
        apiCalls: apiCalls,
        rateLimits: {
            windowMs: limiter.windowMs,
            max: limiter.max,
            current: "See endpoint-specific stats below"
        }
    };
    res.json(stats);
});

// Apply your existing routes
app.use('/api/network/registerComplaint', networkComplaintRouter);
app.use('/api/network/trackComplaint', networkComplaintTrackRouter);
app.use('/api/network/unblockWebsites', networkUnblockRouter);
app.use('/api/network/admin/complaints', networkAdminComplaintRouter);
app.use('/api/network/admin/employees', networkAdminEmployeeRouter);
app.use('/api/network/admin/assignComplaint', networkAdminAssignComplaintRouter);
app.use('/api/network/employeeComplaint', networkAdminEmployeeComplaintRouter);
app.use('/api/network/resolveComplaint', networkResolveComplaintRouter);
app.use('/api/getUserRole', getUserRoleRouter);
app.use('/api/register', registerRouter);
app.use('/api/updateName', updateNameRouter);
app.use('/login', require('./api/login.js'));

app.get('/', (req, res) => {
    res.send('Mysql x express running!');
});

// Periodically log API statistics (every hour)
setInterval(() => {
    console.log('=== API CALL STATISTICS ===');
    console.log(`Total API calls: ${apiCalls.total}`);
    console.log('Calls by endpoint:');
    for (const [endpoint, count] of Object.entries(apiCalls.endpoints)) {
        console.log(`  ${endpoint}: ${count}`);
    }
    console.log('=========================');
}, 10000); // Log every hour

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});