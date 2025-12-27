import {
  CheckCircle,
  Clock,
  Rocket,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { headers } from "next/headers";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Aumente sua receita",
      description: "Reduza faltas e otimize sua agenda",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Pacientes satisfeitos",
      description: "Lembretes automáticos e confirmações",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Segurança garantida",
      description: "Dados protegidos com criptografia",
      color: "from-orange-500 to-red-500",
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
          <div className="mx-auto max-w-7xl space-y-12 pb-12">
            {/* Hero Section with Grid */}
            <div className="grid items-start gap-8 lg:grid-cols-2">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-5xl leading-tight font-bold">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Desbloqueie
                    </span>
                    <br />
                    <span className="text-foreground">
                      todo o potencial da sua clínica
                    </span>
                  </h2>
                  <p className="text-muted-foreground text-xl leading-relaxed">
                    Transforme a gestão do seu consultório com tecnologia de
                    ponta. Mais tempo para cuidar dos pacientes, menos tempo com
                    papelada.
                  </p>
                </div>

                {/* Alert Banner */}
                <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:border-amber-800 dark:from-amber-950/20 dark:to-orange-950/20">
                  <Rocket className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    <strong>
                      💡 Profissionais economizam em média 15 horas por semana
                    </strong>{" "}
                    em tarefas administrativas. Não perca mais tempo!
                  </AlertDescription>
                </Alert>

                {/* Benefits Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="group bg-muted/50 dark:bg-card transform rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${benefit.color} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">30 dias grátis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Cancele quando quiser</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing Card */}
              <div className="lg:sticky lg:top-8">
                <SubscriptionPlan
                  active={session!.user.plan === "essential"}
                  userEmail={session!.user.email}
                />
              </div>
            </div>

            {/* Footer Text */}
            <div className="border-t pt-8">
              <p className="text-muted-foreground text-center">
                Junte-se a mais de{" "}
                <strong className="text-foreground">
                  2.000 profissionais de saúde
                </strong>{" "}
                que já transformaram sua rotina.
              </p>
            </div>
          </div>
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default SubscriptionPage;
