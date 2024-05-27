import mongoose, { Document, Schema, Types } from "mongoose";

// TODO: add types for others and separate them
type AppearanceStyleType = "BENTO" | "LINKS" | "PORTFOLIO";
type ButtonStyleType = "PRIMARY" | "SECONDARY";

interface IAppearance extends Document {
  user: Types.ObjectId;
  style: AppearanceStyleType;
  darkMode: boolean;
  bgImage?: string;
  bgColor: string;
  fontFamily: string;
  headerAlignment: string;
  buttonStyle: ButtonStyleType;
  profilePicBorder: string;
  textColor: string;
  TitleColor: string;
}

const appearanceSchema: Schema<IAppearance> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  style: {
    type: String,
    default: "LINKS",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  buttonStyle: {
    type: String,
    default: "PRIMARY",
  },
  bgImage: {
    type: String,
  },
  bgColor: {
    type: String,
    default: "DEFAULT",
  },
  fontFamily: {
    type: String,
    default: "PRIMARY",
  },
  headerAlignment: {
    type: String,
    default: "CENTER",
  },
  profilePicBorder: {
    type: String,
    default: "NONE",
  },
  textColor: {
    type: String,
    default: "DEFAULT",
  },
  TitleColor: {
    type: String,
    default: "DEFAULT",
  },
});

export default mongoose.models.Appearance ||
  mongoose.model<IAppearance>("Appearance", appearanceSchema);
