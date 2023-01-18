import tRPCPlugin from "cloudflare-pages-plugin-trpc";
import { appRouter } from "../router/_app";
import { createContext } from "../trpc";

export const onRequest: PagesFunction = tRPCPlugin({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext,
  onError: ({ error }) => {
    console.log(error);
  },
});
