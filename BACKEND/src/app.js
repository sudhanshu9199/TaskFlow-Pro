const express = require('express')
const authRoutes = require('./routes/auth.route.js');
const crudRoutes = require('./routes/crud.route.js');
const authMiddleware = require('./middleware/auth.middleware.js');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, crudRoutes);

module.exports = app;