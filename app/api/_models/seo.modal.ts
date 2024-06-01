import mongoose, { Document, Schema, Types } from "mongoose";

interface ISEO extends Document {
  user: Types.ObjectId;
  title: string;
  metaDescription: string;
  metaKeywords: string;
  visibility: boolean;
}

const seoSchema: Schema<ISEO> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  metaKeywords: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.SEO || mongoose.model<ISEO>("SEO", seoSchema);
