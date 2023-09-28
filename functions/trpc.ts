import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { FetchCreateContextWithCloudflareEnvFnOptions } from "cloudflare-pages-plugin-trpc";
import { OpenAI } from "./openai";
import {Ai } from "@cloudflare/ai"

const mock = false;
export const createContext = async ({
  env,
}: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  const openai = new OpenAI(env.OPENAI_APIKEY);
  const ai = new Ai(env.AI)
  return {
    openai,
    mock,
    ai
  };
};
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
