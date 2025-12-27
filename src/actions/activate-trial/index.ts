"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const activateTrial = actionClient.action(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Usuário não autenticado");
  }

  if (session.user.plan) {
    return { success: false, message: "Usuário já possui um plano ativo" };
  }

  if (session.user.isDemoUser && session.user.demoTrialEndsAt) {
    const now = new Date();
    const trialEnds = new Date(session.user.demoTrialEndsAt);
    if (now < trialEnds) {
      return { success: false, message: "Teste gratuito já está ativo" };
    }
  }

  // Ativar trial de 30 dias
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 30);

  await db
    .update(usersTable)
    .set({
      isDemoUser: true,
      demoTrialEndsAt: trialEndsAt,
    })
    .where(eq(usersTable.id, session.user.id));

  return { success: true, message: "Teste gratuito ativado com sucesso!" };
});
