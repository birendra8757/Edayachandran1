const mongoose = require("mongoose")


const Company = new mongoose.Schema({

    Companytype: {
        type: String,
        enum: ["Proprietorship Company", "Partnership Company", "Limited liability Company", "Private limited Company", "Public limited", "TRUST OR NGO"],
        require: true,
        trim: true
    },
    CompanyName: {
        type: String,
        require: true,
        trim: true
    },
    Aadhaar:{type:Number,required:true,unique:true,trim:true},
    PanNumber:{type:String,required:true,unique:true,trim:true},
    phone: { type:Number, required:true, unique:true,trim:true },
    email: { type:String, required:true,  unique:true,trim:true },

}, { timestamps: true })

module.exports = mongoose.model("CompanyDetails", Company)
