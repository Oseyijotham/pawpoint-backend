import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for User"],
    },
    avatarURL: {
      type: String,
      default:
        "https://geo-pets-backend-qokl.onrender.com/avatars/unknownUser.png",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    groups: {
      type: Array,
      default: ["favourites"],
    },
    apiKey: {
      type: String,
      default: null,
    },
    apiKeyName: {
      type: String,
      default: null,
    },
    apiAccountId: {
      type: String,
      default: null,
    },
    apiCreationDate: {
      type: String,
      default: null,
    },
    /*verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },*/
  },
  { versionKey: false }
);

const User = model("user", userSchema);

export { User };
