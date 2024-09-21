const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../controller/task.controller');

router.get("/", controller.index);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/detail/:id", controller.detail);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.patch("/change-status/:id", controller.changeStatus);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.patch("/change-multi", controller.changeMulti);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/create", controller.create);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.patch("/edit/:id", controller.edit);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.delete("/delete/:id", controller.delete);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router;//export hàm router