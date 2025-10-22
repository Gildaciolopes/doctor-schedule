import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { isDemoUser } = await request.json();

    // Definir data de fim do período de teste (30 dias a partir de agora)
    const demoTrialEndsAt = isDemoUser
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
      : null;

    // Atualizar o campo isDemoUser e demoTrialEndsAt do usuário
    await db
      .update(usersTable)
      .set({
        isDemoUser,
        demoTrialEndsAt,
      })
      .where(eq(usersTable.id, session.user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar status demo:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
