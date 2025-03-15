// import { Schema, model, models } from 'mongoose';

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     unique: [true, 'Email already exists!'],
//     required: [true, 'Email is required!'],
//   },
//   username: {
//     type: String,
//     required: [true, 'Username is required!'],
//   },
//   image: {
//     type: String,
//   },
//   payment:{
//     type:Boolean,
//     default:false,
//   },
//   receipt:{
//     type:String,
//   },
//   verified:{
//     type:Boolean,
//     default:false,
//   },
//   has_type:{
//     type:Boolean,
//     default:false
//   },
//   is_admin:{
//     type:Boolean,
//     required:true
//   }
// });

// const User = models.User || model("User", UserSchema);

// export default User;

import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: function () {
      return this.is_admin; // Password required only for admins
    },
    select: false, // Do not return password in queries by default
  },
  payment: {
    type: Boolean,
    default: false,
  },
  receipt: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  has_type: {
    type: Boolean,
    default: false,
  },
  is_admin: {
    type: Boolean,
    required: true,
  },
});

// Hash password before saving (only if modified)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = models.User || model("User", UserSchema);

export default User;
