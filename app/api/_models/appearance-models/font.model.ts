import mongoose, { Document, Schema } from "mongoose";

interface IFont extends Document {
  family: string;
  color: string;
}

const fontSchema: Schema<IFont> = new Schema({
  family: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
});

export default mongoose.models.Font ||
  mongoose.model<IFont>("Font", fontSchema);
