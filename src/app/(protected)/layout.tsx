import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { DemoUserHandler } from "@/components/demo-user-handler";
import { AppSidebar } from "./_components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DemoUserHandler />
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
