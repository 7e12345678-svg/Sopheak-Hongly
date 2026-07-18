import mongoose, { Schema } from "mongoose";

const PromoSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Promo ||
  mongoose.model("Promo", PromoSchema);