import tRPCPlugin from "cloudflare-pages-plugin-trpc";
import { appRouter } from "../router/_app";

export const onRequest: PagesFunction = tRPCPlugin({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext: () => ({})
});
