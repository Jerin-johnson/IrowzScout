import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IJobMatch extends Document {
  userId: Types.ObjectId;

  searchProfileId: Types.ObjectId;

  jobId: Types.ObjectId;

  score: number;

  breakdown: {
    skills: number;
    experience: number;
    role: number;
    location: number;
    salary: number;
    semantic: number;
  };

  matchedSkills: string[];

  missingSkills: string[];

  explanation: string;

  status: "new" | "viewed" | "saved" | "dismissed" | "applied";

  matchedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const breakdownSchema = new Schema(
  {
    skills: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    experience: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    role: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    location: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    salary: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    semantic: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
  { _id: false },
);

const jobMatchSchema = new Schema<IJobMatch>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    searchProfileId: {
      type: Schema.Types.ObjectId,
      ref: "SearchProfile",
      required: true,
      index: true,
    },

    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      index: true,
    },

    breakdown: {
      type: breakdownSchema,
      required: true,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    explanation: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "viewed", "saved", "dismissed", "applied"],
      default: "new",
      index: true,
    },

    matchedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

jobMatchSchema.index({
  userId: 1,
  createdAt: -1,
});

jobMatchSchema.index({
  userId: 1,
  score: -1,
});

jobMatchSchema.index(
  {
    userId: 1,
    jobId: 1,
  },
  {
    unique: true,
  },
);

export const JobMatch: Model<IJobMatch> =
  mongoose.models.JobMatch ||
  mongoose.model<IJobMatch>("JobMatch", jobMatchSchema);
