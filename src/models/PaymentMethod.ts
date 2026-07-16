import mongoose, {
  Schema,
  model,
  models,
  Document,
} from "mongoose";

export interface IPaymentMethod extends Document {
  name: string;

  logo: string;

  qr: string;

  accountName: string;

  accountNumber: string;

  enabled: boolean;
}

const PaymentMethodSchema =
  new Schema<IPaymentMethod>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },

      logo: {
        type: String,
        default: "",
      },

      qr: {
        type: String,
        default: "",
      },

      accountName: {
        type: String,
        default: "",
      },

      accountNumber: {
        type: String,
        default: "",
      },

      enabled: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default (
  models.PaymentMethod as mongoose.Model<IPaymentMethod>
) ||
  model<IPaymentMethod>(
    "PaymentMethod",
    PaymentMethodSchema
  );