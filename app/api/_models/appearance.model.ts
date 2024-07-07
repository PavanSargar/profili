import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type AppearanceStyleType = "BENTO" | "LINKS" | "PORTFOLIO";
export type HeaderAlignmentType = "CENTER" | "LEFT" | "RIGHT";

interface IAppearance extends Document {
  user: Types.ObjectId;
  style: AppearanceStyleType;
  darkMode?: boolean;
  background?: Types.ObjectId;
  theme?: Types.ObjectId;
  button?: Types.ObjectId;
  font?: Types.ObjectId;
  headerAlignment: HeaderAlignmentType;
}

const appearanceSchema: Schema<IAppearance> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  style: {
    type: String,
    enum: ["BENTO", "LINKS", "PORTFOLIO"],
    default: "LINKS",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  background: {
    type: Types.ObjectId,
    ref: "Background",
    required: false,
  },
  theme: {
    type: Types.ObjectId,
    ref: "Theme",
    required: false,
  },
  button: {
    type: Types.ObjectId,
    ref: "Button",
    required: false,
  },
  font: {
    type: Types.ObjectId,
    ref: "Font",
    required: false,
  },
  headerAlignment: {
    type: String,
    enum: ["CENTER", "LEFT", "RIGHT"],
    default: "CENTER",
  },
});

export default (mongoose.models.Appearance ||
  mongoose.model("Appearance", appearanceSchema)) as Model<IAppearance>;
