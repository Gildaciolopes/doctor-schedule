import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getDaysRemainingInTrial } from "@/helpers/demo-trial";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "../(protected)/subscription/_components/subscription-plan";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const isDemoUser = session.user.isDemoUser;
  const daysRemaining = getDaysRemainingInTrial(
    session.user.demoTrialEndsAt || null,
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="mb-8 w-full max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {isDemoUser
            ? "Continue sua jornada de sucesso!"
            : "Desbloqueie todo o potencial da sua clínica"}
        </h1>
        <p className="mb-6 text-xl text-gray-600">
          {isDemoUser ? (
            <>
              Você já experimentou nossa plataforma por {30 - daysRemaining}{" "}
              dias. Para continuar aproveitando todos os benefícios, escolha um
              plano que se adapte às suas necessidades.
            </>
          ) : (
            <>
              Para continuar utilizando nossa plataforma e transformar a gestão
              do seu consultório, é necessário escolher um plano que se adapte
              às suas necessidades.
            </>
          )}
        </p>

        {isDemoUser && daysRemaining > 0 && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="font-medium text-blue-800">
              ⏰ <span className="font-semibold">Período de teste ativo</span> -
              Restam {daysRemaining} dia{daysRemaining !== 1 ? "s" : ""} para
              escolher seu plano.
            </p>
          </div>
        )}

        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="font-medium text-amber-800">
            🚀{" "}
            <span className="font-semibold">
              Profissionais que utilizam nossa plataforma economizam em média 15
              horas por semana
            </span>{" "}
            em tarefas administrativas. Não perca mais tempo com agendas manuais
            e processos ineficientes!
          </p>
        </div>
      </div>

      <div className="w-full max-w-md">
        <SubscriptionPlan userEmail={session.user.email} />
      </div>

      <div className="mt-8 max-w-lg text-center">
        <p className="text-sm text-gray-500">
          Junte-se a mais de 2.000 profissionais de saúde que já transformaram
          sua rotina com nossa solução. Garantia de satisfação de 30 dias ou seu
          dinheiro de volta.
        </p>
      </div>
    </div>
  );
}
