import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import type { AppRouter } from "../functions/router/_app";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>();
export const links = [
  httpBatchLink({
    url: `${window.location.protocol}//${window.location.host}/api/trpc`,
  }),
];
export const trpcClient = createTRPCProxyClient<AppRouter>({
  links,
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
