import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    videoUrl: { type: String, required: true },
    foodPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPartner",
      required: true,
    },
  },
  { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);
