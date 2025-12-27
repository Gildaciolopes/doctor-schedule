"use client";

import { AlertTriangle, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface TrialNotificationProps {
  isDemoUser: boolean;
  demoTrialEndsAt: Date | null;
  plan: string | null;
}

export function TrialNotification({
  isDemoUser,
  demoTrialEndsAt,
  plan,
}: TrialNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    // Não mostrar se não é usuário demo ou se já tem plano pago
    if (!isDemoUser || plan || !demoTrialEndsAt) {
      setIsVisible(false);
      return;
    }

    const now = new Date();
    const trialEnd = new Date(demoTrialEndsAt);
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Só mostrar se ainda tem dias restantes
    if (diffDays > 0) {
      setDaysRemaining(diffDays);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isDemoUser, demoTrialEndsAt, plan]);

  if (!isVisible) return null;

  const isUrgent = daysRemaining <= 3;

  return (
    <div className="mx-auto w-full px-4">
      <div className="mx-auto w-full">
        <Alert
          className={`my-2 ${isUrgent ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20" : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              {isUrgent ? (
                <AlertTriangle className="mt-0.5 h-4 w-4 text-orange-600 dark:text-orange-400" />
              ) : (
                <Clock className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
              )}
              <AlertDescription
                className={`${isUrgent ? "text-orange-800 dark:text-orange-200" : "text-blue-800 dark:text-blue-200"}`}
              >
                {isUrgent ? (
                  <>
                    <strong>
                      Período de teste expira em {daysRemaining} dia
                      {daysRemaining !== 1 ? "s" : ""}!
                    </strong>
                    <br />
                    Para continuar usando a plataforma, escolha um plano de
                    assinatura.
                  </>
                ) : (
                  <>
                    <strong>Período de teste ativo</strong> - Restam{" "}
                    {daysRemaining} dias para explorar todas as funcionalidades
                    gratuitamente.
                  </>
                )}
              </AlertDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
}
