import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ISearchRun extends Document {
  type: "scheduled_search" | "source_ingestion" | "user_matching";

  userId?: Types.ObjectId;

  searchProfileId?: Types.ObjectId;

  sourceId?: Types.ObjectId;

  status: "pending" | "running" | "completed" | "failed";

  startedAt?: Date;

  completedAt?: Date;

  stats: {
    jobsFetched: number;
    jobsCreated: number;
    jobsUpdated: number;
    jobsDeduplicated: number;
    jobsMatched: number;
    errors: number;
  };

  error?: string;

  createdAt: Date;
  updatedAt: Date;
}

const searchRunSchema = new Schema<ISearchRun>(
  {
    type: {
      type: String,
      enum: ["scheduled_search", "source_ingestion", "user_matching"],
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    searchProfileId: {
      type: Schema.Types.ObjectId,
      ref: "SearchProfile",
      index: true,
    },

    sourceId: {
      type: Schema.Types.ObjectId,
      ref: "JobSource",
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed"],
      default: "pending",
      index: true,
    },

    startedAt: Date,

    completedAt: Date,

    stats: {
      jobsFetched: {
        type: Number,
        default: 0,
      },

      jobsCreated: {
        type: Number,
        default: 0,
      },

      jobsUpdated: {
        type: Number,
        default: 0,
      },

      jobsDeduplicated: {
        type: Number,
        default: 0,
      },

      jobsMatched: {
        type: Number,
        default: 0,
      },

      errors: {
        type: Number,
        default: 0,
      },
    },

    error: String,
  },
  {
    timestamps: true,
  },
);

searchRunSchema.index({
  userId: 1,
  createdAt: -1,
});

export const SearchRun: Model<ISearchRun> =
  mongoose.models.SearchRun ||
  mongoose.model<ISearchRun>("SearchRun", searchRunSchema);
