import { initTRPC } from "@trpc/server";
import { translateScoring } from "./translateScoring";
export const t = initTRPC.create();

export const appRouter = t.router({
  translateScoring,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
