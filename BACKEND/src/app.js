const express = require('express')
const authRoutes = require('./routes/auth.route.js');
const crudRoutes = require('./routes/crud.route.js');
const authMiddleware = require('./middleware/auth.middleware.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, crudRoutes);


module.exports = app;