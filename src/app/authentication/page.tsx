import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";

import AuthShell from "./components/auth-shell";

const AuthenticationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) => {
  const session = await getSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  const resolvedSearchParams = await searchParams;
  const isDemo = resolvedSearchParams.demo === "true";

  return (
    <div className="dark">
      <div className="bg-background relative flex min-h-svh w-full items-center justify-center overflow-hidden px-3 py-3 text-foreground sm:px-4 sm:py-6 lg:min-h-screen lg:py-8">
        <div className="landing-grid pointer-events-none absolute inset-0" />
        <div className="bg-chart-1/25 pointer-events-none absolute left-[-8%] top-10 h-48 w-48 rounded-full blur-3xl" />
        <div className="bg-chart-4/22 pointer-events-none absolute bottom-10 right-[-5%] h-56 w-56 rounded-full blur-3xl" />
        <div className="bg-foreground/8 pointer-events-none absolute left-1/2 top-[12%] h-44 w-44 -translate-x-1/2 rounded-full blur-3xl" />

        <div className="auth-shadow-shell bg-card/42 relative grid w-full max-w-[1440px] overflow-hidden rounded-[2rem] border border-border/70 backdrop-blur-2xl lg:grid-cols-[0.78fr_1.22fr] xl:grid-cols-[0.74fr_1.26fr]">
          <div className="bg-gradient-to-br from-chart-1 via-primary to-chart-4 text-foreground relative hidden overflow-hidden p-8 lg:flex lg:flex-col lg:justify-between xl:p-10">
            <div className="bg-foreground/8 absolute inset-0" />
            <div className="bg-foreground/10 absolute left-[-8%] top-12 h-36 w-36 rounded-full blur-3xl" />
            <div className="bg-background/12 absolute bottom-[-8%] right-[-6%] h-48 w-48 rounded-full blur-3xl" />
            <div className="relative space-y-4">
              <Button
                asChild
                variant="ghost"
                className="text-foreground/80 hover:bg-foreground/10 hover:text-foreground -ml-2 mb-6 w-fit gap-1"
              >
                <Link href="/">
                  <ChevronLeft className="h-4 w-4" />
                  Voltar
                </Link>
              </Button>
              <p className="text-foreground/72 text-sm font-medium uppercase tracking-[0.35em]">
                Doctor Schedule
              </p>
              <h1 className="max-w-md text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                Organize sua rotina clínica em uma experiência clara, rápida e
                segura.
              </h1>
              <p className="text-foreground/84 max-w-lg text-base leading-8">
                Entre na plataforma para acompanhar agendamentos, pacientes e
                operações da clínica com mais organização, segurança e
                praticidade.
              </p>
            </div>

            <div className="auth-shadow-soft bg-foreground/10 relative rounded-[1.75rem] border border-foreground/15 p-6 backdrop-blur-md">
              <p className="text-foreground/84 text-sm leading-6">
                Uma experiência de acesso pensada para equipes que precisam de
                clareza, agilidade e confiança em cada etapa do atendimento.
              </p>
            </div>
          </div>

          <AuthShell isDemo={isDemo} />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
