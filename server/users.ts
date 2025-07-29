"use server";
import { MainURL } from "@/constants/general/url";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(
  email: string,
  password: string,
  rememberMe: boolean = false
) {
  try {
    // Validate input
    if (!email || !password) {
      throw new Error("Email and password are required for sign in.");
    }
    // Attempt to sign in the user with email and password
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
        callbackURL: MainURL,
      },
      headers: await headers(),
    });
  } catch (error) {
    // Handle any errors that occur during sign-in
    const e = error as Error;
    console.error("Sign in error:", e);
    return {
      success: false,
      message: e.message || "An error occurred while signing in.",
    };
  }
  redirect(MainURL);
}

export async function signInWithSocial(
  provider: "google" | "discord" | "reddit" | "github" | "twitch"
) {
  try {
    // Attempt to sign in the user with the specified social provider
    if (
      !["google", "discord", "reddit", "github", "twitch"].includes(provider)
    ) {
      throw new Error("Unsupported provider");
    }
    await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: MainURL,
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
}

export async function signUp(email: string, password: string, name: string) {
  try {
    // Attempt to sign up the user with email, password and name
    if (!email || !password || !name) {
      throw new Error(
        "Email, password, and name are required for registration."
      );
    }
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: MainURL,
      },
    });
  } catch (error) {
    // Handle any errors that occur during registration
    const e = error as Error;
    console.error("Sign up error:", e);
    return {
      success: false,
      message: e.message || "An error occurred while registering.",
    };
  }
  redirect(MainURL);
}

export async function signOut() {
  try {
    // Attempt to sign out the user
    await auth.api.signOut({
      // This endpoint requires session cookies.
      headers: await headers(),
    });
  } catch (error) {
    // Handle any errors that occur during sign-out
    const e = error as Error;
    console.error("Sign out error:", e);
    return {
      success: false,
      message: e.message || "An error occurred while signing out.",
    };
  }
}
