const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;
app.use(express.json());

const usersRoute = require('./routes/userRoutes');
app.use('/api/users', usersRoute);

app.listen(port, ()=>{
    console.log(`server connected to ${port}`);
});