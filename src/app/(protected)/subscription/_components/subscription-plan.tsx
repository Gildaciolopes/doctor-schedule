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
      if (!stripe) throw new Error("Stripe not found");
      if (!data?.sessionId) throw new Error("Session ID not found");
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
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

  return (
    <div
      className={`${className ?? ""} bg-card overflow-hidden rounded-2xl border shadow-sm`}
    >
      {/* Card Header — usa bg-primary do design system */}
      <div className="bg-primary px-6 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-primary-foreground/70 mb-1 text-xs font-medium tracking-widest uppercase">
              Plano
            </p>
            <h3 className="text-primary-foreground text-2xl font-bold">
              Essential
            </h3>
          </div>
          {active && (
            <Badge className="border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 text-xs">
              ✓ Ativo
            </Badge>
          )}
        </div>
        <p className="text-primary-foreground/70 mt-3 text-sm">
          Para profissionais autônomos ou pequenas clínicas
        </p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-primary-foreground text-4xl font-bold">
            R$59
          </span>
          <span className="text-primary-foreground/70">/mês</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2.5">
          {!active && (
            <Button
              className="w-full"
              size="lg"
              onClick={() => activateTrialAction.execute()}
              disabled={activateTrialAction.isExecuting}
            >
              {activateTrialAction.isExecuting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Começar Teste Grátis de 30 Dias
                </>
              )}
            </Button>
          )}
          <Button
            className="w-full"
            variant={active ? "default" : "outline"}
            size="lg"
            onClick={
              active
                ? () =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${userEmail}`,
                    )
                : () => createStripeCheckoutAction.execute()
            }
            disabled={createStripeCheckoutAction.isExecuting}
          >
            {createStripeCheckoutAction.isExecuting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : active ? (
              "Gerenciar assinatura"
            ) : (
              "Fazer assinatura"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
