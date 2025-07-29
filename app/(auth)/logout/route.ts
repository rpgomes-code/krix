import { signOut } from "@/server/users";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { MainURL } from "@/constants/general/url";

export async function GET() {
  revalidatePath("/", "layout");

  await signOut().catch((error) => {
    console.error("Sign out error:", error);
    // Handle error, e.g., show a notification  or log the error
  });

  return NextResponse.redirect(MainURL);
}
