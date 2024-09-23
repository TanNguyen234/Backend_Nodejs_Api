const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../controller/user.controller');

router.post("/register", controller.register);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router;//export hàm router