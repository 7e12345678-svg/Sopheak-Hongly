import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    game: {
      type: String,
      required: true,
    },

    gameId: {
      type: String,
      required: true,
    },

    playerName: {
      type: String,
      required: true,
    },

    serverId: {
      type: String,
      required: true,
    },

    package: {
      type: String,
      required: true,
    },
    price: {
  type: Number,
  required: true,
},

    payment: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    screenshot: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);