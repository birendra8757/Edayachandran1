const userModel = require('../Model/UserModel');
const CompanyModel = require('../Model/CompanyModel');
const PaymentModel = require("../Model/PaymentModel");
let servicetype = ["GST Return Monthly","GST Return Quarterly","GST Return Half yearly","GST Return Annually","GST Activation","GST Cancellation","GST Modification","Change of Constitution","GST Refund"];
const craetepayment = async (req,res)=>{
    try {
        
       
        if (Object.keys(req.body).length == 0) {
             return res
                 .status(400)
                 .send({
                     status: false,
                     message: "for payment data is required",
                 });
         }
         let { CompanyId ,userName, service } = req.body;
        
 
         if (!CompanyId) {return res.status(400).send({ status: false, message: "Enter your  CompanyId" }); }
         if (!userName) {return res.status(400).send({ status: false, message: "Enter your  userName" }); }
         if (!service) {return res.status(400).send({ status: false, message: "Enter your  service" }); }
         //-----------checking address is in right formate or not---------------/
        
        let company = await CompanyModel.findById(CompanyId);
        if(!company)return res.status(400).send({status:false,message:"your companyId is incorrect"})
        
         let existcompany = await CompanyModel.findById(CompanyId);
         if (!existcompany) {
             return res
                 .status(400)
                 .send({
                     status: false,
                     message: "User with this company is not registered.",
                 });
         }
         let existemp = await userModel.findOne({userName:userName});
         if(!existemp)return res.status(400).send({status:false,message:"this employee is not registered"})
       if(existemp.CompanyId!=CompanyId)return res.status(400).send({status:false,message:"you are not authorised"})
        
       if(!servicetype.includes(service))return res.status(400).send({status:false,message:"please choose service from GST Return Monthly or GST Return Quarterly or GST Return Half yearly or GST Return Annually or GST Activation or GST Cancellation or GST Modification or Change of Constitution orGST Refund "})
              let amount =0;
              
                if(service=="GST Return Monthly"){
                    amount = 500;
                }
              if(service =="GST Return Quarterly"){
                amount =1400;
              }
              if(service=="GST Return Half yearly"){
                amount =2500;
              }
        if(service =="GST Return Annually"){
            amount = 4800;
        }

        if(service=="GST Activation"){
            amount =1000;
        }
        if(service=="GST Cancellation"){
amount = 500;
        }

        if(service=="GST Modification"){
amount =500
        }

        if(service=="Change of Constitution"){
            amount =1000
                    }
if(service =="GST Refund"){
    amount =3000;
}
         const dataForCreation={ CompanyId ,userName, service ,amount };
         
         const savedData = await PaymentModel.create(dataForCreation);
         return res
             .status(201)
             .send({ status: true, message: "Success", data: savedData });
     } catch (err) {
         return res.status(500).send({ status: false, error: err.message });
     }
 };
 

 const getallpayment = async (req,res)=>{
    try {
        let result = await PaymentModel.find();
        return res.status(200).send({ status: true, message: "Success", data: result })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
 }
 module.exports = {craetepayment,getallpayment}