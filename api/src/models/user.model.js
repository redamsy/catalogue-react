import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    }
  },
  toObject: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    }
  },
  versionKey: false,
  timestamps: true
};

const userSchema = new Schema({
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

export const userModel = mongoose.model("User", userSchema);

export const productModel = mongoose.model(
  "Product",
  Schema({
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
    },
    imageUrl: {
      type: String,
      required: true,
      maxlength: 150,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    remaining: {
      type: Number,
      required: true,
      min: 0,
      max: 9999,
    },
  }, modelOptions)
);

export const categoryModel = mongoose.model(
  "Category",
  Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required : [true, 'Please add a category Name'],  
    },
  }, modelOptions)
);

export const subCategoryModel = mongoose.model(
  "SubCategory",
  Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required : [true, 'Please add a SubCategory Name'],  
    },
  }, modelOptions)
);

const pSCCSchema = new Schema({
  productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required : [true, 'PSCC must belong to a category'],

  },
  categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required : [true, 'PSCC must belong to a category'],

  },
  subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required : [true, 'PSCC must belong to a subCategory'],
  },
}, modelOptions);

pSCCSchema.index({ productId: 1, categoryId: 1, subCategoryId: 1 }, { unique: true });


export const pSCCModel = mongoose.model('PSCC', pSCCSchema);


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

