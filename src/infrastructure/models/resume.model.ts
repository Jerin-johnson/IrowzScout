import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IResumeExperience {
  company: string;
  title: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  skills: string[];
}

export interface IResumeEducation {
  institution: string;
  degree?: string;
  field?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IResumeProject {
  name: string;
  description?: string;
  technologies: string[];
  url?: string;
}

export interface IResumeProfile {
  summary?: string;
  skills: string[];
  experiences: IResumeExperience[];
  education: IResumeEducation[];
  projects: IResumeProject[];
  certifications: string[];
  languages: string[];
}

export interface IResume extends Document {
  userId: Types.ObjectId;

  originalFileName: string;
  storageKey: string;
  mimeType: string;
  fileSize: number;

  version: number;

  status: "uploaded" | "processing" | "processed" | "failed";

  parsedText?: string;

  extractedProfile?: IResumeProfile;

  parsingMetadata?: {
    provider: string;
    model: string;
    processedAt: Date;
  };

  createdAt: Date;
  updatedAt: Date;
}

const resumeExperienceSchema = new Schema<IResumeExperience>(
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

    skills: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const resumeEducationSchema = new Schema<IResumeEducation>(
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

const resumeProjectSchema = new Schema<IResumeProject>(
  {
    name: {
      type: String,
      required: true,
    },

    description: String,

    technologies: {
      type: [String],
      default: [],
    },

    url: String,
  },
  { _id: false },
);

const resumeProfileSchema = new Schema<IResumeProfile>(
  {
    summary: String,

    skills: {
      type: [String],
      default: [],
    },

    experiences: {
      type: [resumeExperienceSchema],
      default: [],
    },

    education: {
      type: [resumeEducationSchema],
      default: [],
    },

    projects: {
      type: [resumeProjectSchema],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },

    languages: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    storageKey: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    version: {
      type: Number,
      required: true,
      default: 1,
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "processed", "failed"],
      default: "uploaded",
      index: true,
    },

    parsedText: String,

    extractedProfile: {
      type: resumeProfileSchema,
    },

    parsingMetadata: {
      provider: String,
      model: String,
      processedAt: Date,
    },
  },
  {
    timestamps: true,
  },
);

resumeSchema.index({
  userId: 1,
  createdAt: -1,
});

export const Resume: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", resumeSchema);
