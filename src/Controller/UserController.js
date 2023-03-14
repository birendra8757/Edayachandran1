const userModel = require('../Model/UserModel');
const CompanyModel = require('../Model/CompanyModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        
       
       if (Object.keys(req.body).length == 0) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "for creation user data is required",
                });
        }
        let { CompanyId ,userName, password  } = req.body;
       

        if (!CompanyId) {return res.status(400).send({ status: false, message: "Enter your  CompanyId" }); }
        if (!userName) {return res.status(400).send({ status: false, message: "Enter your  userName" }); }
        if (!password) {return res.status(400).send({ status: false, message: "Enter your  password" }); }
        //-----------checking address is in right formate or not---------------/
       
       let company = await CompanyModel.findById(CompanyId);
       if(!company)return res.status(400).send({status:false,message:"your companyod is incorrect"})
        if(userName.length<5)return res.status(400).send("please enter valid username")

        let existphone = await userModel.findOne({ userName: userName });
        if (existphone) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "User with this userId is already registered.",
                });
        }

      

        if (! /^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/.test(password)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "please Enter valid Password and it's length should be 8-15",
                });
        }
        
             
        password = await bcrypt.hash(req.body.password, 10);
        // console.log(password);
        const dataForCreation={CompanyId ,userName, password };
        const savedData = await userModel.create(dataForCreation);
        return res
            .status(201)
            .send({ status: true, message: "Success", data: savedData });
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
};

const loginUser = async function (req, res) {
    try {
      let { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).send({ status: false, message: "for login user email and password both are required" })
        }
      const user = await userModel.findOne({ userName: userName});
      if (!user) {
        return res.status(400).send({ status: false, message: "Please enter your correct userName" });
      }
      let hpassword = await bcrypt.compare(password,user.password)
      if(hpassword==false)return res.status(400).send({status:false,message:"Please enter your correct password"})

      let exp = "20h";
      const token = jwt.sign(
        { userId: (user._id).toString() },
        "Birendra-kumar-sah",
        { expiresIn: exp }
      );
      let datas= {token:token, userName:user._id, iat:Date.now(), exp:exp}
     return res.status(201).send({ status: true, message: "Login successfully...!", data: datas });
    } catch (error) {
    return  res.status(500).send({ status: false, err: error.message });
    }
  };

module.exports = {createUser,loginUser}