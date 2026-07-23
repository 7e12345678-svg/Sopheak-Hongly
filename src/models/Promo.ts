import mongoose, { Schema, models, model } from "mongoose";

const PromoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    buttonText: {
      type: String,
      default: "Shop Now",
    },

    active: {
      type: Boolean,
      default: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Promo || model("Promo", PromoSchema);