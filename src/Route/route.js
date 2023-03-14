const express = require('express');
const router = express.Router();
const {registerCompany}=require("../Controller/CompanyController");
const {createUser,loginUser} = require("../Controller/UserController");
const {craetepayment,getallpayment} = require("../Controller/PaymentController");
router.get("/test-me",  function (req, res) {
    res.send("My first ever api!")
})
router.post('/companies',registerCompany)
router.post("/register",createUser)
router.post("/login",loginUser)
router.post("/craetepayment",craetepayment);
router.get("/payments",getallpayment)
router.all('/*',function(req,res){
    return res.status(400).send({status:false,message:"check url"})
    })
    module.exports = router;