import { MainURL } from "@/constants/general/url";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: MainURL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
