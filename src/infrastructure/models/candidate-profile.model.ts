import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ICandidateSkill {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  years?: number;
}

export interface ICandidateExperience {
  company: string;
  title: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

export interface ICandidateProfile extends Document {
  userId: Types.ObjectId;

  sourceResumeId?: Types.ObjectId;

  headline?: string;
  summary?: string;

  skills: ICandidateSkill[];

  experiences: ICandidateExperience[];

  education: {
    institution: string;
    degree?: string;
    field?: string;
    startDate?: Date;
    endDate?: Date;
  }[];

  totalExperience?: number;

  seniority?: "intern" | "junior" | "mid" | "senior" | "lead" | "principal";

  preferredRoles: string[];
  preferredLocations: string[];

  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ICandidateSkill>(
  {
    name: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
    },

    years: Number,
  },
  { _id: false },
);

const experienceSchema = new Schema<ICandidateExperience>(
  {
    company: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    startDate: Date,
    endDate: Date,

    description: String,
  },
  { _id: false },
);

const educationSchema = new Schema(
  {
    institution: {
      type: String,
      required: true,
    },

    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
  },
  { _id: false },
);

const candidateProfileSchema = new Schema<ICandidateProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    sourceResumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },

    headline: String,

    summary: String,

    skills: {
      type: [skillSchema],
      default: [],
    },

    experiences: {
      type: [experienceSchema],
      default: [],
    },

    education: {
      type: [educationSchema],
      default: [],
    },

    totalExperience: Number,

    seniority: {
      type: String,
      enum: ["intern", "junior", "mid", "senior", "lead", "principal"],
    },

    preferredRoles: {
      type: [String],
      default: [],
    },

    preferredLocations: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const CandidateProfile: Model<ICandidateProfile> =
  mongoose.models.CandidateProfile ||
  mongoose.model<ICandidateProfile>("CandidateProfile", candidateProfileSchema);
