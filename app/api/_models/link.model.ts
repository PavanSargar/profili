import mongoose, { Schema } from "mongoose";

interface ILink extends Document {
  title: string;
  url: string;
  clicks?: number;
  pin?: boolean;
  thumbnail?: string;
  order?: number;
  active?: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const LinkSchema: Schema<ILink> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Link title is requried!"],
    },
    url: {
      type: String,
      required: [true, "URL is requried!"],
    },
    clicks: {
      type: Number,
      default: 0,
      required: false,
    },
    pin: {
      type: Boolean,
      required: false,
      default: false,
    },
    thumbnail: {
      type: String,
      required: false,
      default: "",
    },
    order: {
      type: Number,
      required: [true, "Order for Link is required"],
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Link ||
  mongoose.model<ILink>("Link", LinkSchema);
