"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (
  email: string,
  password: string,
  rememberMe: boolean = false
) => {
  try {
    // Attempt to sign in the user with email and password
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
        callbackURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Successfully signed in.",
    };
    //redirect(`/`);
  } catch (error) {
    // Handle any errors that occur during sign-in
    const e = error as Error;
    console.error("Sign in error:", e);
    return {
      success: false,
      message: e.message || "An error occurred while signing in.",
    };
  }
};

export const signInWithSocial = async (
  provider: "google" | "discord" | "apple" | "github"
) => {
  try {
    // Attempt to sign in the user with the specified social provider
    if (!["google", "discord", "apple", "github"].includes(provider)) {
      throw new Error("Unsupported provider");
    }
    await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: "Successfully signed in.",
    };
  } catch (error) {
    // Handle any errors that occur during sign-in
    const e = error as Error;
    console.error("Sign in error:", e);
    return {
      success: false,
      message: e.message || "An error occurred while signing in.",
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    // Attempt to sign up the user with email, password and name
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      },
    });
    return {
      success: true,
      message: "Successfully registered.",
    };
    //redirect(`/`);
  } catch (error) {
    // Handle any errors that occur during registration
    const e = error as Error;
    console.error("Sign up error:", e);
    return {
      success: false,
      message: e.message || "An error occurred while registering.",
    };
  }
};

export const signOut = async () => {
  try {
    // Attempt to sign out the user
    await auth.api.signOut({
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    redirect(`/`);
  } catch (error) {
    // Handle any errors that occur during sign-out
    const e = error as Error;
    console.error("Sign out error:", e);
    return {
      success: false,
      message: e.message || "An error occurred while signing out.",
    };
  }
};
