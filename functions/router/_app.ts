import { t } from "../trpc";
import { timeOutTest } from "./timeOutTest";
import { translateScoring } from "./translateScoring";

export const appRouter = t.router({
  translateScoring,
  timeOutTest,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
