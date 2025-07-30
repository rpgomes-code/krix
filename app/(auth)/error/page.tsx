"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const code = searchParams.get("code");
  const router = useRouter();

  const getErrorMessage = () => {
    // Handle Better Auth specific error codes
    switch (error || code) {
      case "invalid_code":
        return {
          title: "Invalid Authentication Code",
          description:
            "The authentication code provided is invalid or has expired. Please try logging in again.",
        };
      case "access_denied":
        return {
          title: "Access Denied",
          description:
            "You denied access to your account. Please try again if this was a mistake.",
        };
      case "configuration":
        return {
          title: "Configuration Error",
          description:
            "There's an issue with the authentication configuration. Please contact support.",
        };
      case "server_error":
        return {
          title: "Server Error",
          description:
            "An unexpected error occurred on our servers. Please try again later.",
        };
      case "invalid_request":
        return {
          title: "Invalid Request",
          description:
            "The authentication request was invalid. Please try logging in again.",
        };
      case "temporarily_unavailable":
        return {
          title: "Service Unavailable",
          description:
            "The authentication service is temporarily unavailable. Please try again later.",
        };
      default:
        return {
          title: "Authentication Error",
          description:
            "We encountered an issue while processing your request. Please try again or contact support if the problem persists.",
        };
    }
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* Logo */}
      <Link
        href="/"
        className="mb-8 flex flex-col items-center gap-2 text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
        aria-label="Return to Krix homepage"
      >
        <div className="flex aspect-square size-20 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground shadow-md hover:shadow-lg transition-shadow">
          <Image
            src="/krix/krix.png"
            alt="Krix Logo"
            width={200}
            height={200}
            priority
          />
        </div>
      </Link>

      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-destructive/10 p-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>

            <h1 className="mb-2 text-2xl font-bold">{errorInfo.title}</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              {errorInfo.description}
            </p>

            {/* Error details for debugging (only in development) */}
            {process.env.NODE_ENV === "development" && (error || code) && (
              <div className="mb-6 w-full rounded-md bg-muted p-3 text-left">
                <p className="text-xs font-mono text-muted-foreground">
                  Error Code: {error || code}
                </p>
              </div>
            )}

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => router.push("/login")}
                className="flex-1"
                variant="default"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="flex-1"
                variant="outline"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Need help?{" "}
          <Link
            href="/support"
            className="font-medium text-primary hover:underline"
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}
