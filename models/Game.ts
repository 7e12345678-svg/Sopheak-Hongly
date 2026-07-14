import mongoose, { Schema } from "mongoose";

const PackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    packages: {
      type: [PackageSchema],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Game ||
  mongoose.model("Game", GameSchema);