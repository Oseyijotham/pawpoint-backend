import { Schema, model } from "mongoose";

const placesSchema = new Schema(
  {
    data: {
      type: Object,
      required: [true, "Set data for place"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    avatarURL: {
      type: String,
      default:
        "https://geo-pets-backend-qokl.onrender.com/avatars/unknownCustomer.png",
    },
    description: {
      type: String,
      default: "Enter place description",
    },
  },
  { versionKey: false }
);

const Place = model("place", placesSchema);

export { Place };
