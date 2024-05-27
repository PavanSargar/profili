import mongoose, { Document, Schema, Types } from "mongoose";

interface IAnalytics extends Document {
  user: Types.ObjectId;
  impressions: number;
  google: {
    trackingId: string;
  };
}

const analyticsSchema: Schema<IAnalytics> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  impressions: {
    type: Number,
    default: 0,
  },
  google: {
    trackingId: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.models.Analytics ||
  mongoose.model<IAnalytics>("Analytics", analyticsSchema);
