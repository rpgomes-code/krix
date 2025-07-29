"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Apple, Google } from "iconsax-reactjs";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { signInWithSocial } from "@/server/users";
import { signIn } from "@/server/users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  rememberMe: z.boolean().optional(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { success, message } = await signIn(
      values.email,
      values.password,
      values.rememberMe
    );
    if (!success) {
      // Handle error, e.g., show a notification
      toast.error("Login failed:", {
        description: message || "An error occurred while logging in.",
      });
    }
    setIsLoading(false);
  }

  async function onClickSocial(
    provider: "google" | "discord" | "apple" | "github"
  ) {
    setIsLoading(true);
    // Attempt to sign in with the specified social provider
    if (!["google", "discord", "apple", "github"].includes(provider)) {
      toast.error("Unsupported provider");
      setIsLoading(false);
      return;
    }
    const { success, message } = await signInWithSocial(provider);
    if (!success) {
      // Handle error, e.g., show a notification
      toast.error("Login failed:", {
        description: message || "An error occurred while logging in.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center gap-1 mb-2 mt-4">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Login to access your Krix account.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="my@email.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="***********"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="flex items-center mt-2">
                        <FormField
                          control={form.control}
                          name="rememberMe"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer text-xs font-normal">
                                Remember me
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        <div className="ml-auto text-sm underline-offset-2 hover:underline">
                          <Link
                            href="/forgot-password"
                            className="text-muted-foreground text-xs"
                          >
                            <span>Forgot password?</span>
                          </Link>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin size-4" />{" "}
                      <span>Logging in...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    {
                      icon: <Apple size="20" variant="Bold" />,
                      code: "apple",
                      label: "Apple",
                      hoverBorder: "hover:border-black dark:hover:border-white",
                    },
                    {
                      icon: <Google size="20" variant="Bold" />,
                      code: "google",
                      label: "Google",
                      hoverBorder:
                        "hover:border-green-700 dark:hover:border-green-700",
                    },
                    {
                      icon: <FaDiscord size="20" />,
                      code: "discord",
                      label: "Discord",
                      hoverBorder:
                        "hover:border-[#4285F4] dark:hover:border-[#4285F4]",
                    },
                    {
                      icon: <FaGithub size="20" />,
                      code: "github",
                      label: "GitHub",
                      hoverBorder:
                        "hover:border-[#6e5494] dark:hover:border-[#6e5494]",
                    },
                  ].map((provider) => (
                    <Button
                      key={provider.label}
                      type="button"
                      variant="outline"
                      onClick={() =>
                        onClickSocial(
                          provider.code as
                            | "google"
                            | "discord"
                            | "apple"
                            | "github"
                        )
                      }
                      className={`h-11 border hover:border-2 transition-colors ${provider.hoverBorder} cursor-pointer disabled:cursor-not-allowed`}
                      aria-label={`Sign in with ${provider.label}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin size-4" />
                          <span className="sr-only">
                            Signing in with {provider.label}
                          </span>
                        </>
                      ) : (
                        <>
                          {provider.icon}
                          <span className="sr-only">
                            Sign in with {provider.label}
                          </span>
                        </>
                      )}
                    </Button>
                  ))}
                </div>
                <div className="text-center text-xs flex flex-row items-center justify-center gap-1">
                  <p>Don't have an account? </p>
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/krix/krix-minimalist.jpg"
              width={500}
              height={500}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}
