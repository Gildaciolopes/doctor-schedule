import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";

/**
 * Route handler usado como callbackURL do Google OAuth no fluxo de demo.
 * Ativa o trial de 30 dias, limpa o cookie de cache da sessão e redireciona
 * para o dashboard — evitando a race condition com o cookieCache do better-auth.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.redirect(
        new URL("/authentication?demo=true", request.url),
      );
    }

    // Só ativa se ainda não tem plano nem demo ativo
    if (!session.user.plan && !session.user.isDemoUser) {
      await db
        .update(usersTable)
        .set({
          isDemoUser: true,
          demoTrialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        .where(eq(usersTable.id, session.user.id));
    }

    // Redireciona para o dashboard limpando o cookie de cache da sessão
    // para que o próximo getSession leia os dados frescos do DB.
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.delete("better-auth.session_data");
    return response;
  } catch (error) {
    console.error("Erro ao ativar demo:", error);
    return NextResponse.redirect(
      new URL("/authentication?demo=true", request.url),
    );
  }
}
