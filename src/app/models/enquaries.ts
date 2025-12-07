import mongoose, { Schema, Document, Model } from "mongoose";

export interface Inquiry extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;

  ipAddress: string;
  userAgent: string;

  status: "new" | "in_progress" | "resolved";

  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema<Inquiry> = new Schema<Inquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/, // strict Indian validation
    },

    service: {
      type: String,
      required: true,
      enum: [
        "website",
        "app",
        "trading",
        "ecommerce",
        "branding",
        "uiux",
        "other",
      ],
    },

    message: {
      type: String,
      required: false,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    // Extra security + tracking
    ipAddress: {
      type: String,
      required: false,
      default: "",
    },

    userAgent: {
      type: String,
      required: false,
      default: "",
    },

    // Admin Panel Friendly
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved"],
      default: "new",
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
    versionKey: false,
  }
);

let InquiryModel: Model<Inquiry>;

try {
  InquiryModel = mongoose.model<Inquiry>("Inquiry");
} catch {
  InquiryModel = mongoose.model<Inquiry>("Inquiry", InquirySchema);
}

export default InquiryModel;
