import { headers } from "next/headers";

import { DemoUserHandler } from "@/components/demo-user-handler";
import { TrialExpiredBanner } from "@/components/trial-expired-banner";
import { TrialNotification } from "@/components/trial-notification";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

import { AppSidebar } from "./_components/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarProvider>
      <DemoUserHandler />
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {session?.user && (
          <>
            <TrialExpiredBanner
              isDemoUser={session.user.isDemoUser}
              demoTrialEndsAt={session.user.demoTrialEndsAt || null}
              plan={session.user.plan || null}
            />
            <TrialNotification
              isDemoUser={session.user.isDemoUser}
              demoTrialEndsAt={session.user.demoTrialEndsAt || null}
              plan={session.user.plan || null}
            />
          </>
        )}
        {children}
      </main>
    </SidebarProvider>
  );
}
