import {
  CheckCircle,
  Clock,
  Rocket,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { headers } from "next/headers";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import WithAuthentication from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const benefits = [
    {
      icon: Clock,
      title: "Economize 15h/semana",
      description: "Automatize tarefas administrativas repetitivas",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: TrendingUp,
      title: "Aumente sua receita",
      description: "Reduza faltas e otimize sua agenda",
      color: "from-violet-500 to-purple-400",
    },
    {
      icon: Users,
      title: "Pacientes satisfeitos",
      description: "Lembretes automáticos e confirmações",
      color: "from-emerald-500 to-teal-400",
    },
    {
      icon: Shield,
      title: "Segurança garantida",
      description: "Dados protegidos com criptografia",
      color: "from-orange-500 to-amber-400",
    },
  ];

  return (
    <WithAuthentication mustHaveClinic>
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Assinaturas</PageTitle>
            <PageDescription>
              Escolha o plano ideal para sua clínica.
            </PageDescription>
          </PageHeaderContent>
        </PageHeader>

        <PageContent>
          <div className="pb-8">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
              {/* Left Column */}
              <div className="flex flex-col gap-8">
                {/* Hero heading */}
                <div className="space-y-4">
                  <h2 className="text-4xl leading-[1.15] font-bold tracking-tight text-balance">
                    <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                      Desbloqueie
                    </span>{" "}
                    <span className="text-foreground">
                      todo o potencial da sua clínica
                    </span>
                  </h2>
                  <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                    Transforme a gestão do seu consultório com tecnologia de
                    ponta. Mais tempo para cuidar dos pacientes, menos tempo com
                    papelada.
                  </p>
                </div>

                {/* Alert Banner */}
                <div className="flex items-start gap-3 rounded-xl border border-amber-200/60 bg-amber-50/80 px-4 py-3.5 dark:border-amber-700/40 dark:bg-amber-950/30">
                  <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-200">
                    <strong className="font-semibold">
                      💡 Profissionais economizam em média 15 horas por semana
                    </strong>{" "}
                    em tarefas administrativas. Não perca mais tempo!
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="group bg-muted/40 dark:bg-card hover:border-border flex flex-col gap-3 rounded-xl border border-transparent p-5 transition-all duration-200 hover:shadow-sm"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${benefit.color} shrink-0 shadow-sm`}
                      >
                        <benefit.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-sm leading-snug font-semibold">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Guarantees */}
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm font-medium">30 dias grátis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm font-medium">
                      Cancele quando quiser
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column — Pricing Card */}
              <div className="lg:sticky lg:top-6">
                <SubscriptionPlan
                  active={session!.user.plan === "essential"}
                  userEmail={session!.user.email}
                />
              </div>
            </div>

            {/* Footer */}
            <p className="text-muted-foreground mt-10 border-t pt-6 text-center text-sm">
              Junte-se a mais de{" "}
              <strong className="text-foreground font-semibold">
                2.000 profissionais de saúde
              </strong>{" "}
              que já transformaram sua rotina com nossa solução.
            </p>
          </div>
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default SubscriptionPage;
