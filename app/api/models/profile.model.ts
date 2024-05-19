import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IIcon {
  url?: string;
  iconId?: string;
}
interface IProfile extends Document {
  user: Types.ObjectId;
  profilePic?: string;
  bio?: string;
  displayName?: string;
  icons?: IIcon[];
}

const profileSchema: Schema<IProfile> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
      default: '',
    },
    bio: {
      type: String,
      required: false,
    },
    displayName: {
      type: String,
      required: true,
    },
    icons: [
      {
        url: String,
        iconId: String,
      },
    ],
  },
  { timestamps: true }
);

export default (mongoose.models.Profile ||
  mongoose.model("Profile", profileSchema)) as Model<IProfile>;
