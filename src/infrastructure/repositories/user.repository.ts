import { connectToDatabase } from "../database/connection";
import { User } from "../models";
import { IUser } from "../models/user.model";

export interface CreateUserInput {
  email: string;
  name: string;
  passwordHash?: string;
  avatarUrl?: string;
  provider: "credentials" | "google";
}

export class UserRepository {
  async findByEmail(
    email: string,
    withPassword = false,
  ): Promise<IUser | null> {
    await connectToDatabase();
    const query = User.findOne({ email: email.toLowerCase().trim() });
    if (withPassword) query.select("+passwordHash");
    return query.exec();
  }

  async findById(id: string): Promise<IUser | null> {
    await connectToDatabase();
    return User.findById(id).exec();
  }

  async create(input: CreateUserInput): Promise<IUser> {
    await connectToDatabase();
    return User.create(input);
  }

  async findOrCreateGoogleUser(profile: {
    email: string;
    name: string;
    avatarUrl?: string;
  }): Promise<IUser> {
    await connectToDatabase();
    const existing = await User.findOne({
      email: profile.email.toLowerCase().trim(),
    });
    if (existing) return existing;

    return User.create({
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.avatarUrl,
      provider: "google",
    });
  }

  async setResumeCompleted(
    userId: string,
    value = true,
  ): Promise<IUser | null> {
    await connectToDatabase();
    return User.findByIdAndUpdate(
      userId,
      { resumeCompleted: value },
      { new: true },
    ).exec();
  }

  async updateProfile(
    userId: string,
    updates: Partial<Pick<IUser, "name" | "avatarUrl">>,
  ): Promise<IUser | null> {
    await connectToDatabase();
    return User.findByIdAndUpdate(userId, updates, { new: true }).exec();
  }
}

export const userRepository = new UserRepository();
