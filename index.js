const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()//Cấu hình file env
const database = require('./config/database');

database.connect(); // Kết nối đến database

const route = require('./api/v1/routes/index.route')
const app = express();
const port = process.env.PORT

app.use(cors());

// parse application/json
app.use(bodyParser.json())

route(app)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})