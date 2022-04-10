require('mongoose-type-email');

const mongoose = require("mongoose");


const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,email: mongoose.SchemaTypes.Email},
    password: { type: String, required: true, length:6},
    phoneno: {type: String, required:true},
    role: {type: String, required: true},
  
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
