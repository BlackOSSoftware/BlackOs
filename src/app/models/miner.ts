import mongoose, { Schema, Document, Model } from "mongoose";

export interface IImageRef {
  url: string;
  public_id: string;
}

export interface IMiner extends Document {
  id: string;
  title: string;
  brand?: string;
  modelname?: string;
  description?: string;
  outputVoltage?: string;
  coolingMethod?: string;
  category?: string;
  price: number;
  discountPrice?: number;
  stockQty: number;
  minQty: number;
  maxQty: number;
  images: IImageRef[];
  grade: "New" | "Refurbised";
  hotMiner: boolean;
  topSeller: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<IImageRef>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false }
);

const MinerSchema = new Schema<IMiner>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    brand: { type: String, default: "" },
    modelname: { type: String, default: "" },
    description: { type: String, default: "" },
    outputVoltage: { type: String, default: "" },
    coolingMethod: { type: String, default: "" },
    category: { type: String, default: "" },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    stockQty: { type: Number, default: 0 },
    minQty: { type: Number, default: 1 },
    maxQty: { type: Number, default: 10 },
    images: { type: [ImageSchema], default: [] },
    grade: {
      type: String,
      enum: ["New", "Refurbised"],
      default: "New",
    },
    hotMiner: { type: Boolean, default: false },
    topSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Miner: Model<IMiner> = mongoose.models.Miner || mongoose.model<IMiner>("Miner", MinerSchema);
export default Miner;
