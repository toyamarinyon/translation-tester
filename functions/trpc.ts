import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { FetchCreateContextWithCloudflareEnvFnOptions } from "cloudflare-pages-plugin-trpc";
import { OpenAI } from "./openai";

export const createContext = async ({
  env,
}: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  const openai = new OpenAI(env.OPENAI_APIKEY)
  return {
    openai,
  };
};
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
