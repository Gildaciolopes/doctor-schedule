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
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(160deg,_#020617_0%,_#0b1120_48%,_#111827_100%)] px-3 py-3 sm:px-4 sm:py-6 lg:min-h-screen lg:py-8">
      <div className="landing-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-[-8%] top-10 h-48 w-48 rounded-full bg-blue-500/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-5%] h-56 w-56 rounded-full bg-violet-500/16 blur-3xl" />

      <div className="relative grid w-full max-w-[1440px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:grid-cols-[0.78fr_1.22fr] xl:grid-cols-[0.74fr_1.26fr]">
        <div className="relative hidden overflow-hidden bg-[linear-gradient(145deg,_#1d4ed8_0%,_#2563eb_42%,_#6d28d9_100%)] p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_30%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(15,23,42,0.14)_100%)]" />
          <div className="relative space-y-4">
            <Button
              asChild
              variant="ghost"
              className="-ml-2 mb-6 w-fit gap-1 text-white/75 hover:bg-white/12 hover:text-white"
            >
              <Link href="/">
                <ChevronLeft className="h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/70">
              Doctor Schedule
            </p>
            <h1 className="max-w-md text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              Centralize sua rotina clínica com acesso rápido e protegido.
            </h1>
            <p className="max-w-lg text-base leading-8 text-white/75">
              Entre na plataforma para acompanhar agendamentos, pacientes e
              operações da clínica com mais organização, segurança e
              praticidade.
            </p>
          </div>

          <div className="relative rounded-[1.75rem] border border-white/18 bg-white/10 p-6 backdrop-blur-md">
            <p className="text-sm leading-6 text-white/80">
              Uma experiência de acesso pensada para equipes que precisam de
              clareza, agilidade e confiança em cada etapa do atendimento.
            </p>
          </div>
        </div>

        <AuthShell isDemo={isDemo} />
      </div>
    </div>
  );
};

export default AuthenticationPage;
