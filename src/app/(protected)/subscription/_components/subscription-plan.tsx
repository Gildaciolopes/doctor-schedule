"use client";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { activateTrial } from "@/actions/activate-trial";
import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SubscriptionPlanProps {
  active?: boolean;
  className?: string;
  userEmail: string;
}

export function SubscriptionPlan({
  active = false,
  className,
  userEmail,
}: SubscriptionPlanProps) {
  const router = useRouter();
  const createStripeCheckoutAction = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key not found");
      }
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error("Stripe not found");
      }
      if (!data?.sessionId) {
        throw new Error("Session ID not found");
      }
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
  });

  const activateTrialAction = useAction(activateTrial, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Teste gratuito ativado! Aproveite seus 30 dias.");
        router.push("/dashboard");
      } else {
        toast.info(data?.message || "Não foi possível ativar o teste.");
      }
    },
    onError: () => {
      toast.error("Erro ao ativar teste gratuito.");
    },
  });

  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
  ];

  const handleSubscribeClick = () => {
    createStripeCheckoutAction.execute();
  };

  const handleManagePlanClick = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${userEmail}`,
    );
  };

  return (
    <Card
      className={`${className} from-background via-background to-muted/20 border-2 bg-gradient-to-br shadow-xl`}
    >
      <CardHeader className="space-y-4 pb-8">
        <div className="flex items-center justify-between">
          <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
            Essential
          </h3>
          {active && (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/30">
              ✓ Plano Atual
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-base">
          Para profissionais autônomos ou pequenas clínicas
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold">R$59</span>
          <span className="text-muted-foreground text-lg">/ mês</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3.5 border-t pt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-purple-400" />
              </div>
              <p className="text-sm font-medium">{feature}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4">
          {!active && (
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-xl"
              size="lg"
              onClick={() => activateTrialAction.execute()}
              disabled={activateTrialAction.isExecuting}
            >
              {activateTrialAction.isExecuting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Começar Teste Grátis de 30 Dias
                </>
              )}
            </Button>
          )}
          <Button
            className="w-full"
            variant={active ? "default" : "outline"}
            size="lg"
            onClick={active ? handleManagePlanClick : handleSubscribeClick}
            disabled={createStripeCheckoutAction.isExecuting}
          >
            {createStripeCheckoutAction.isExecuting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : active ? (
              "Gerenciar assinatura"
            ) : (
              "Fazer assinatura"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
