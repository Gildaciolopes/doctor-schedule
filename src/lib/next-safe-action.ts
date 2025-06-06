import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";

import { auth } from "./auth";

export const actionClient = createSafeActionClient();

export const protectedActionClient = createSafeActionClient().use(
  async ({ next }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    return next({ ctx: { user: session.user } });
  },
);

export const protectedWithClinicActionClient = protectedActionClient.use(
  async ({ next, ctx }) => {
    if (!ctx.user.clinic?.id) {
      throw new Error("Clinic not found");
    }
    return next({
      ctx: {
        user: {
          ...ctx.user,
          clinic: ctx.user.clinic!,
        },
      },
    });
  },
);
