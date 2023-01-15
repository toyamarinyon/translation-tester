import { t } from "../trpc";
import { translateScoring } from "./translateScoring";

export const appRouter = t.router({
  translateScoring,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
