const CompanyModel = require('../Model/CompanyModel');
const userModel = require('../Model/UserModel');

let type = ["Proprietorship Company", "Partnership Company", "Limited liability Company", "Private limited Company", "Public limited", "TRUST OR NGO"]
const registerCompany = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({
                status: false,
                message: "for creation company data is required",
            });
        }
        let { Companytype, CompanyName, Aadhaar, PanNumber, phone, email } = req.body;

        if (!Companytype) { return res.status(400).send({ status: false, message: "Enter your  Companytype" }); }
        if (!CompanyName) { return res.status(400).send({ status: false, message: "Enter your  companyname" }); }
        if (!email) { return res.status(400).send({ status: false, message: "Enter your  email" }); }
        if (!phone) { return res.status(400).send({ status: false, message: "Enter your  phone" }); }
        if (!Aadhaar) { return res.status(400).send({ status: false, message: "Enter your  Aadhar" }); }
        if (!PanNumber) { return res.status(400).send({ status: false, message: "Enter your  Pannumber" }); }
        //-----------checking address is in right formate or not---------------/



        if (!type.includes(Companytype)) { return res.status(400).send({ status: false, message: "Please enter Proprietorship Company or Partnership Company or Limited liability Company or Private limited Company or Public limited or TRUST OR NGO" }); }
        if (!/([a-zA-z])+/g.test(CompanyName)) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter a valid company name" });
        }
        if (!/^[\s]*[6-9]\d{9}[\s]*$/.test(phone)) {
            return res
                .status(400)
                .send({ status: false, message: "Please Enter valid phone Number" });
        }

        let existphone = await CompanyModel.findOne({ phone: phone });
        if (existphone) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "User with this phone number is already registered.",
                });
        }

        if (!/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/.test(email)) {
            return res
                .status(400)
                .send({ status: false, message: "Please Enter valid Email" });
        }

        let existEmail = await CompanyModel.findOne({ email: email });
        if (existEmail) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "User with this email is already registered",
                });
        }


        const dataForCreation = { Companytype, CompanyName, Aadhaar, PanNumber, phone, email };
        const savedData = await CompanyModel.create(dataForCreation);
        return res
            .status(201)
            .send({ status: true, message: "Success", data: savedData });
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
};

module.exports = { registerCompany }