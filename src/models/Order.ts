import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  game: string;
  gameId: string;
  playerName: string;
  serverId: string;
  package: string;
  price: number;
  payment: string;
  phone: string;
  screenshot: string;

  trackingCode: string;

  status:
    | "Pending"
    | "Processing"
    | "Completed"
    | "Cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
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

    trackingCode: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default (models.Order as mongoose.Model<IOrder>) ||
  model<IOrder>("Order", OrderSchema);