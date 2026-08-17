import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ISearchProfile extends Document {
  userId: Types.ObjectId;

  name: string;

  targetRoles: string[];

  locations: string[];

  remotePreference: "onsite" | "hybrid" | "remote" | "any";

  employmentTypes: ("full-time" | "part-time" | "contract" | "internship")[];

  minimumSalary?: number;
  maximumSalary?: number;
  currency?: string;

  experienceLevel?: "intern" | "entry" | "junior" | "mid" | "senior" | "lead";

  keywords: string[];
  excludedCompanies: string[];
  excludedKeywords: string[];

  frequency: "daily";

  isActive: boolean;

  lastRunAt?: Date;
  nextRunAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const searchProfileSchema = new Schema<ISearchProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    targetRoles: {
      type: [String],
      default: [],
    },

    locations: {
      type: [String],
      default: [],
    },

    remotePreference: {
      type: String,
      enum: ["onsite", "hybrid", "remote", "any"],
      default: "any",
    },

    employmentTypes: {
      type: [String],
      enum: ["full-time", "part-time", "contract", "internship"],
      default: ["full-time"],
    },

    minimumSalary: Number,
    maximumSalary: Number,

    currency: {
      type: String,
      default: "INR",
    },

    experienceLevel: {
      type: String,
      enum: ["intern", "entry", "junior", "mid", "senior", "lead"],
    },

    keywords: {
      type: [String],
      default: [],
    },

    excludedCompanies: {
      type: [String],
      default: [],
    },

    excludedKeywords: {
      type: [String],
      default: [],
    },

    frequency: {
      type: String,
      enum: ["daily"],
      default: "daily",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastRunAt: Date,
    nextRunAt: Date,
  },
  {
    timestamps: true,
  },
);

searchProfileSchema.index({
  userId: 1,
  isActive: 1,
});

export const SearchProfile: Model<ISearchProfile> =
  mongoose.models.SearchProfile ||
  mongoose.model<ISearchProfile>("SearchProfile", searchProfileSchema);
