const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
  },
  { timestamps: true }
);
const Users = mongoose.model("users", UserSchema);
module.exports = Users;
