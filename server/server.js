const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;
app.use(express.json());

const adminRoute = require('./routes/adminRouter');
const usersRoute = require('./routes/userRoutes');

// Routes
app.use('/api/admin', adminRoute);
app.use('/api/users', usersRoute);

app.listen(port, ()=>{
    console.log(`server connected to ${port}`);
});