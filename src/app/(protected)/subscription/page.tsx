import {
  CheckCircle,
  Clock,
  Rocket,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import WithAuthentication from "@/hocs/with-authentication";
import { getSession } from "@/lib/get-session";

import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await getSession();

  const benefits = [
    {
      icon: Clock,
      title: "Economize 15h/semana",
      description: "Automatize tarefas administrativas repetitivas",
    },
    {
      icon: TrendingUp,
      title: "Aumente sua receita",
      description: "Reduza faltas e otimize sua agenda",
    },
    {
      icon: Users,
      title: "Pacientes satisfeitos",
      description: "Lembretes automáticos e confirmações",
    },
    {
      icon: Shield,
      title: "Segurança garantida",
      description: "Dados protegidos com criptografia",
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
                    <span className="text-primary">Desbloqueie</span>{" "}
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
                <div className="bg-primary/5 border-primary/20 flex items-start gap-3 rounded-xl border px-4 py-3.5">
                  <Rocket className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <strong className="text-foreground font-semibold">
                      Profissionais economizam em média 15 horas por semana
                    </strong>{" "}
                    em tarefas administrativas. Não perca mais tempo!
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-muted/40 dark:bg-card hover:border-border flex flex-col gap-3 rounded-xl border border-transparent p-5 transition-all duration-200 hover:shadow-sm"
                    >
                      <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <benefit.icon className="text-primary h-5 w-5" />
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
                    <CheckCircle className="text-primary h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium">30 dias grátis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary h-4 w-4 shrink-0" />
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
