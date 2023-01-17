import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { FetchCreateContextWithCloudflareEnvFnOptions } from "cloudflare-pages-plugin-trpc";
import { Configuration, OpenAIApi } from "openai";

const createContext = async ({
  env,
}: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  return {
    openai,
  };
};
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
