/**
 * Verifica se o período de teste do usuário demo ainda é válido
 */
export function isDemoTrialValid(demoTrialEndsAt: Date | null): boolean {
  if (!demoTrialEndsAt) return false;

  const now = new Date();
  return now < demoTrialEndsAt;
}

/**
 * Calcula quantos dias restam do período de teste
 */
export function getDaysRemainingInTrial(demoTrialEndsAt: Date | null): number {
  if (!demoTrialEndsAt) return 0;

  const now = new Date();
  const diffTime = demoTrialEndsAt.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}

/**
 * Verifica se o usuário deve ser considerado como tendo acesso válido
 * (tem plano pago OU é usuário demo com período válido)
 */
export function hasValidAccess(
  plan: string | null,
  isDemoUser: boolean,
  demoTrialEndsAt: Date | null,
): boolean {
  // Se tem plano pago, tem acesso
  if (plan) return true;

  // Se é usuário demo, verifica se o período ainda é válido
  if (isDemoUser) {
    return isDemoTrialValid(demoTrialEndsAt);
  }

  return false;
}
