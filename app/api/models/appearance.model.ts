import mongoose, { Document, Schema, Types } from "mongoose";

export enum appearanceStyle {
  BENTO,
  LINKS,
  PORTFOLIO,
}

interface IAppearance extends Document {
  user: Types.ObjectId;
  style: appearanceStyle;
  darkMode: boolean;
  bgImage?: string;
  bgColor: string;
  fontFamily: string;
  headerAlignment: string;
  buttonStyle: string;
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
