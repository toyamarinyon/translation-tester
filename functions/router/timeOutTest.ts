import { t } from "../trpc";

export const timeOutTest = t.procedure.query(async () => {
  await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
  return {
    message: "Hello World",
  };
});
