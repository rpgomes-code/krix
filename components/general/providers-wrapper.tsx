import { ThemeProvider } from "@/components/theme/theme-provider";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
      enableColorScheme
      themes={["light", "dark"]}
    >
      <SidebarProvider>
        {children}
        <Toaster richColors />
      </SidebarProvider>
    </ThemeProvider>
  );
}
