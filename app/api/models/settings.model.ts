import mongoose, { Document, Model, Schema } from "mongoose";

interface ISetting extends Document {
  user: mongoose.Schema.Types.ObjectId;
  config: {
    appearance: {
      darkMode: boolean;
      bgImage?: string;
      bgColor: string;
      fontFamily: string;
      headerAlignment: string;
      buttonStyle: string;
      profilePicBorder: string;
      textColor: string;
      TitleColor: string;
    };
    seo: {
      title: string;
      metaDescription: string;
      metaKeywords: string;
      visibility: boolean;
    };
    analytics: {
      impressions: number;
      google: {
        trackingId: string;
      };
    };
  };
}

const settingsSchema: Schema<ISetting> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  config: {
    appearance: {
      darkMode: {
        type: Boolean,
        default: false,
      },
      buttonStyle: {
        type: String,
        default: "PRIMARY",
      },
      bgImage: {
        type: String,
      },
      bgColor: {
        type: String,
        default: "DEFAULT",
      },
      fontFamily: {
        type: String,
        default: "PRIMARY",
      },
      headerAlignment: {
        type: String,
        default: "CENTER",
      },
      profilePicBorder: {
        type: String,
        default: "NONE",
      },
      textColor: {
        type: String,
        default: "DEFAULT",
      },
      TitleColor: {
        type: String,
        default: "DEFAULT",
      },
    },
    seo: {
      title: String,
      metaDescription: String,
      metaKeywords: String,
      visibility: {
        type: Boolean,
        default: true,
      },
    },
    analytics: {
      impressions: {
        type: Number,
        default: 0,
      },
      google: {
        trackingId: String,
      },
    },
  },
});

export default (mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema)) as Model<ISetting>;
