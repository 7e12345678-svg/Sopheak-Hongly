
import mongoose, {
  Schema,
  model,
  models,
  Document,
} from "mongoose";

export interface IGamePackage {
  name: string;
  price: number;
}

export interface IGame extends Document {
  name: string;
  slug: string;
  image: string;
  description: string;
  packages: IGamePackage[];
  featured: boolean;
  sortOrder: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<IGamePackage>(
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

const GameSchema = new Schema<IGame>(
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

export default (models.Game as mongoose.Model<IGame>) ||
  model<IGame>("Game", GameSchema);