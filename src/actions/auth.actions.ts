"use server";

import { signIn } from "@/auth";
import { AuthError } from "@auth/core/errors";
import { redirect } from "next/navigation";
import { userRepository } from "@/infrastructure/repositories/user.repository";
import { hashPassword } from "@/lib/auth/password";

export async function registerUser(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "All fields are required." };
  }

  try {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    const passwordHash = await hashPassword(password);

    await userRepository.create({
      name,
      email,
      passwordHash,
      provider: "credentials",
    });
  } catch (error) {
    return { error: "Failed to create account. Please try again." };
  }

  redirect("/sign-in?registered=true");
}

export async function loginUser(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // we redirect manually below so we can catch errors
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "An authentication error occurred." };
      }
    }
    // NEXT_REDIRECT and other internal errors must be rethrown
    throw error;
  }

  redirect("/dashboard");
}
