const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../controller/user.controller');

const authMiddleware = require('../middleware/auth.middleware');

router.post("/register", controller.register);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/login", controller.login);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/password/forgot", controller.forgotPassword);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/password/otp", controller.otpPassword);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/password/reset", controller.resetPassword);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/detail", authMiddleware.requestAuth, controller.detail);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/list", authMiddleware.requestAuth, controller.list);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router;//export hàm router