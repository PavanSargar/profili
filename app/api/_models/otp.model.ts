import mongoose, { Document, Schema, Types } from "mongoose";

interface IOtp extends Document {
  user: Types.ObjectId;
  otp: string;
  isUsed: boolean;
  createdAt: Date;
  expiredAt: Date;
}

const otpSchema: Schema<IOtp> = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
    },
    expiredAt: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// export default OtpModel;

export default mongoose.models.Otp || mongoose.model<IOtp>("Otp", otpSchema);
