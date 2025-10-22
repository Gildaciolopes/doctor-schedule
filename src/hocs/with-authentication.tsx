// Higher ORder Component
// É um componente que recebe um componente e o renderiza
// mas antes de renderizá-lo, executa alguma ação
// ou, passa alguma prop extra pra esse componente

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { hasValidAccess } from "@/helpers/demo-trial";
import { auth } from "@/lib/auth";

const WithAuthentication = async ({
  children,
  mustHavePlan = false,
  mustHaveClinic = false,
}: {
  children: React.ReactNode;
  mustHavePlan?: boolean;
  mustHaveClinic?: boolean;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  // Verifica se o usuário tem acesso válido (plano pago OU período de teste válido)
  if (
    mustHavePlan &&
    !hasValidAccess(
      session.user.plan || null,
      session.user.isDemoUser,
      session.user.demoTrialEndsAt || null,
    )
  ) {
    redirect("/new-subscription");
  }

  if (mustHaveClinic && !session.user.clinic) {
    redirect("/clinic-form");
  }
  return children;
};

export default WithAuthentication;
