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
    },
    bio: {
      type: String,
    },
    displayName: {
      type: String,
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

const ProfileModel: Model<IProfile> = mongoose.model<IProfile>(
  "Profile",
  profileSchema
);
export default ProfileModel;
