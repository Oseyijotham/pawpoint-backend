import { Schema, model } from "mongoose";

const dogSchema = new Schema(
  {
    data: {
      type: Object,
      required: [true, "Set data for place"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false },
);

const Dog = model("dog-image", dogSchema);

export { Dog };
