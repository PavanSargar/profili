import mongoose, { Document, Schema } from "mongoose";

//TODO: Add button styles as per requirement
export type ButtonStyleType = "PRIMARY" | "SECONDARY";

interface IButton extends Document {
  style: "PRIMARY" | "SECONDARY";
  customColor?: string;
  fontColor?: string;
}
 
const buttonSchema: Schema<IButton> = new Schema({
  style: {
    type: String,
    enum: ["PRIMARY", "SECONDARY"],
    default: "PRIMARY",
  },
  customColor: {
    type: String,
    default: null,
  },
  fontColor: {
    type: String,
    default: null
  },
});

export default mongoose.models.Button || mongoose.model<IButton>("Button", buttonSchema);
