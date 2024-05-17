import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isPro: boolean;
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide us your first name!"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide us your last name!"],
    },
    userName: {
      type: String,
      unique: true,
      required: [true, "Username Exist"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email Id!"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
    },
    isPro: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default (mongoose.models.User ||
  mongoose.model("User", userSchema)) as Model<IUser>;
