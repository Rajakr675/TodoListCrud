const express=require("express");
const Router=express.Router();
const controller=require("./Controller");
const Upload = require("./fileUploadService");
const { verfyToken } = require('./jwt')

 
// 1. first routes for Create User.
Router.post('/Create',controller.UserCreate);

// 2. second router for Read User.
Router.get('/Read',verfyToken,controller.UserRead);

// 3. third router for Update User.
Router.patch('/Update',verfyToken,controller.UserUpdate);

// 4.fourth router for Delete User.
Router.delete('/Delete',verfyToken,controller.UserDelete);      //  all routers is proper working......

// 5.fifth router for Login User.
Router.post("/Login",controller.LoginUser);

// 6.six router for Images Upload.
Router.post("/upload",Upload.product.single("image"),controller.imageUpload);

module.exports = Router