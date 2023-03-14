const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    CompanyId: {
      type: ObjectId,
      ref: "CompanyDetails",
      required: true,
      unique: true,
    },
    userName: { type: String, required: true, trim: true },

    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
