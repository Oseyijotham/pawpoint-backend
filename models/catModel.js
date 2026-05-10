import { Schema, model } from "mongoose";

const catSchema = new Schema(
  {
    data: {
      type: Object,
      required: [true, "Set data for place"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
  },
  { versionKey: false },
);

const Cat = model("cat-image", catSchema);

export { Cat };
