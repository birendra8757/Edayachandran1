const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const PaymentSchema = new mongoose.Schema(
    {
      CompanyId: {
        type: ObjectId,
        ref: "CompanyDetails",
        required: true,
        unique: true,
      },
      userName: { type: String,ref:"User", required: true, trim: true },
  
      amount: { type: Number, required: true, trim: true },
      service:{type:String,
    enum:["GST Return Monthly","GST Return Quarterly","GST Return Half yearly","GST Return Annually","GST Activation","GST Cancellation","GST Modification","Change of Constitution","GST Refund"]
}
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Payment", PaymentSchema);