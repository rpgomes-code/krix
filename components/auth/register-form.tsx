"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Google } from "iconsax-reactjs";
import { FaDiscord, FaGithub, FaReddit, FaTwitch } from "react-icons/fa";
import { signUp as serverSignUp } from "@/server/users";
import { authClient } from "@/lib/auth-client";
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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { success, message } = await serverSignUp(
      values.email,
      values.password,
      values.name
    );
    if (!success) {
      toast.error("Registration failed:", {
        description: message || "An error occurred while registering.",
      });
      setIsLoading(false);
    }
  }

  async function onClickSocial(
    provider: "google" | "discord" | "reddit" | "github" | "twitch"
  ) {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      const e = error as Error;
      toast.error("Registration failed:", {
        description: e.message || "An error occurred while registering.",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center gap-1 mb-2 mt-4">
                  <h1 className="text-2xl font-bold">Welcome</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Register to access your Krix features.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="krix"
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
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin size-4" />{" "}
                      <span>Registering...</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    {
                      icon: <FaReddit size="20" />,
                      code: "reddit",
                      label: "Reddit",
                      hoverBorder:
                        "hover:border-amber-600 dark:hover:border-amber-600",
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
                      hoverBorder: "hover:border-black dark:hover:border-white",
                    },
                    {
                      icon: <FaTwitch size="20" />,
                      code: "twitch",
                      label: "Twitch",
                      hoverBorder:
                        "hover:border-purple-600 dark:hover:border-purple-600",
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
                            | "reddit"
                            | "github"
                            | "twitch"
                        )
                      }
                      className={`h-11 border hover:border-2 transition-colors ${provider.hoverBorder} cursor-pointer disabled:cursor-not-allowed`}
                      aria-label={`Register with ${provider.label}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin size-4" />
                          <span className="sr-only">
                            Registering with {provider.label}
                          </span>
                        </>
                      ) : (
                        <>
                          {provider.icon}
                          <span className="sr-only">
                            Register with {provider.label}
                          </span>
                        </>
                      )}
                    </Button>
                  ))}
                </div>
                <div className="text-center text-xs flex flex-row items-center justify-center gap-2">
                  <p>Already have an account? </p>
                  <Link href="/login" className="underline underline-offset-4">
                    Login
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
