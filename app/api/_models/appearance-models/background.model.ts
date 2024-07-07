import mongoose, { Document, Schema } from "mongoose";

export type BackgroundStyleType = "FLAT" | "GRADIENT" | "IMAGE";

interface IBackground extends Document {
  style: "FLAT" | "GRADIENT" | "IMAGE";
  customColor?: string;
  imageUrl?: string;
}

const backgroundSchema: Schema<IBackground> = new Schema({
  style: {
    type: String,
    enum: ["FLAT", "GRADIENT", "IMAGE"],
    default: "FLAT",
  },
  customColor: {
    type: String,
    default: null,
  },
  imageUrl: {
    type: String,
    default: null,
  },
});

export default mongoose.models.Background ||
  mongoose.model<IBackground>("Background", backgroundSchema);
