import mongoose, { Model } from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  salt: {
    type: String,
    required: true,
    select: false
  }
}, modelOptions);

userSchema.methods.transform = function () {
  const {id, userName, name} = this;
  return {userId: id, userName, name};
}
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");

  return this.password === hash;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;


// import mongoose, { Model } from "mongoose";
// import modelOptions from "./model.options";
// import crypto from "crypto";

// const transformFields = ["id", "userName", "name"] as const;

// type Transformed = Pick<UserDocument, (typeof transformFields)[number]>

// interface UserDocument extends Document {
//   id: string;
//   userName: string;
//   name: string;
//   password: string;
//   salt: string;
//   transform(): Transformed;
//   setPassword: (password: string) => void;
//   validPassword: (password: string) => boolean;
// }

// interface UserModel extends Model<UserDocument> {
// }

// const userSchema = new mongoose.Schema<UserDocument>({
//   userName: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false
//   },
//   salt: {
//     type: String,
//     required: true,
//     select: false
//   }
// }, modelOptions);

// userSchema.methods.transform = function (): Transformed {
//   const {id, userName, name} = this;
//   return {id, userName, name};
// }
// userSchema.methods.setPassword = function (password: string) {
//   this.salt = crypto.randomBytes(16).toString("hex");

//   this.password = crypto.pbkdf2Sync(
//     password,
//     this.salt,
//     1000,
//     64,
//     "sha512"
//   ).toString("hex");
// };

// userSchema.methods.validPassword = function (password: string) {
//   const hash = crypto.pbkdf2Sync(
//     password,
//     this.salt,
//     1000,
//     64,
//     "sha512"
//   ).toString("hex");

//   return this.password === hash;
// };

// const userModel = mongoose.model<UserDocument, UserModel>("User", userSchema);

// export default userModel;

