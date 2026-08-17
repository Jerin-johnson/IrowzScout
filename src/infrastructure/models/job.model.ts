import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IJobLocation {
  city?: string;
  state?: string;
  country?: string;
}

export interface IJobSalary {
  min?: number;
  max?: number;
  currency?: string;
  period?: "hour" | "month" | "year";
}

export interface IJobContact {
  email?: string;
  phone?: string;
  name?: string;

  sourceUrl?: string;

  verified: boolean;
  confidence?: number;
}

export interface IJob extends Document {
  sourceId: Types.ObjectId;

  externalId: string;

  title: string;

  company: string;

  description: string;

  location: IJobLocation;

  remote: boolean;

  employmentType?: string;

  seniority?: string;

  salary?: IJobSalary;

  skills: string[];

  url: string;

  postedAt?: Date;

  expiresAt?: Date;

  contact?: IJobContact;

  contentHash: string;

  status: "active" | "expired" | "removed";

  firstSeenAt: Date;

  lastSeenAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<IJobLocation>(
  {
    city: String,
    state: String,
    country: String,
  },
  { _id: false },
);

const salarySchema = new Schema<IJobSalary>(
  {
    min: Number,
    max: Number,

    currency: String,

    period: {
      type: String,
      enum: ["hour", "month", "year"],
    },
  },
  { _id: false },
);

const contactSchema = new Schema<IJobContact>(
  {
    email: String,
    phone: String,
    name: String,

    sourceUrl: String,

    verified: {
      type: Boolean,
      default: false,
    },

    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
  },
  { _id: false },
);

const jobSchema = new Schema<IJob>(
  {
    sourceId: {
      type: Schema.Types.ObjectId,
      ref: "JobSource",
      required: true,
      index: true,
    },

    externalId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: locationSchema,
      default: {},
    },

    remote: {
      type: Boolean,
      default: false,
      index: true,
    },

    employmentType: String,

    seniority: String,

    salary: {
      type: salarySchema,
    },

    skills: {
      type: [String],
      default: [],
    },

    url: {
      type: String,
      required: true,
    },

    postedAt: Date,

    expiresAt: Date,

    contact: {
      type: contactSchema,
    },

    contentHash: {
      type: String,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "expired", "removed"],
      default: "active",
      index: true,
    },

    firstSeenAt: {
      type: Date,
      default: Date.now,
    },

    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

jobSchema.index(
  {
    sourceId: 1,
    externalId: 1,
  },
  {
    unique: true,
  },
);

jobSchema.index({
  postedAt: -1,
});

jobSchema.index({
  "location.country": 1,
  "location.city": 1,
});

export const Job: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);
