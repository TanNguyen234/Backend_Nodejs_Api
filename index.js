const express = require('express');
require('dotenv').config()//Cấu hình file env
const database = require('./config/database');

database.connect(); // Kết nối đến database

const route = require('./api/v1/routes/index.route')
const app = express();
const port = process.env.PORT

route(app)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})