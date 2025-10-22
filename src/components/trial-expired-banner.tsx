"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface TrialExpiredBannerProps {
  isDemoUser: boolean;
  demoTrialEndsAt: Date | null;
  plan: string | null;
}

export function TrialExpiredBanner({
  isDemoUser,
  demoTrialEndsAt,
  plan,
}: TrialExpiredBannerProps) {
  // Não mostrar se não é usuário demo, se já tem plano pago, ou se ainda tem dias restantes
  if (!isDemoUser || plan || !demoTrialEndsAt) {
    return null;
  }

  const now = new Date();
  const trialEnd = new Date(demoTrialEndsAt);
  const diffTime = trialEnd.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Só mostrar se o período expirou
  if (diffDays > 0) {
    return null;
  }

  return (
    <Alert className="mb-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
      <AlertDescription className="text-red-800 dark:text-red-200">
        <div className="flex items-center justify-between">
          <div>
            <strong>Período de teste expirado!</strong>
            <br />
            Para continuar usando a plataforma, escolha um plano de assinatura.
          </div>
          <Link href="/new-subscription">
            <Button size="sm" className="ml-4">
              Escolher Plano
            </Button>
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  );
}
