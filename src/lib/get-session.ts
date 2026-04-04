import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@/lib/auth";

/**
 * Versão memoizada de auth.api.getSession com React.cache().
 * Dentro do mesmo request, múltiplos server components (layout, página,
 * WithAuthentication) chamam esta função e obtêm o mesmo resultado sem
 * consulta extra ao DB — o React deduplica automaticamente.
 */
export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});
