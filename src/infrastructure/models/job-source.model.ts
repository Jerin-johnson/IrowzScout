import mongoose, { Document, Model, Schema } from "mongoose";

export interface IJobSource extends Document {
  name: string;

  type: "api" | "ats" | "career_page" | "aggregator";

  baseUrl?: string;

  isActive: boolean;

  capabilities: {
    search: boolean;
    company: boolean;
    contact: boolean;
  };

  createdAt: Date;
  updatedAt: Date;
}

const jobSourceSchema = new Schema<IJobSource>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["api", "ats", "career_page", "aggregator"],
      required: true,
    },

    baseUrl: String,

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    capabilities: {
      search: {
        type: Boolean,
        default: true,
      },

      company: {
        type: Boolean,
        default: false,
      },

      contact: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const JobSource: Model<IJobSource> =
  mongoose.models.JobSource ||
  mongoose.model<IJobSource>("JobSource", jobSourceSchema);
