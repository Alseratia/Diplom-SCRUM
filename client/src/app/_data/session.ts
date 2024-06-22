import { verifySession } from "@/lib/session";
import type { Session } from "@/lib/types";
import { cache } from "react";

export const getSession = cache(async () => {
  const session = await verifySession();
  return session ? (session as Session) : null;
});
