import mongoose, { Document, Schema } from "mongoose";

interface ITheme extends Document {
  name: string;
  isCustom?: boolean;
  primaryColor: string;
  secondaryColor: string;
}

const themeSchema: Schema<ITheme> = new Schema({
  name: {
    type: String,
    default: null,
  },
  isCustom: {
    type: Boolean,
    default: false,
  },
  primaryColor: {
    type: String,
    default: null,
  },
  secondaryColor: {
    type: String,
    default: null,
  },
});

export default mongoose.models.Theme || mongoose.model<ITheme>("Theme", themeSchema);
