import { AppSidebar } from "@/components/sidebar/sidebar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />
      <div className="h-screen w-full">{children}</div>
    </>
  );
}
