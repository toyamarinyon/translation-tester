import { z } from "zod";
import { t } from "../trpc";

export const translateScoring = t.procedure
  .input(
    z.object({
      source: z.string(),
      translation: z.string(),
    })
  )
  .mutation(async () => {
    await new Promise((r) => setTimeout(r, 1000))
    return {
      comment:
        "訳文は、ほとんど正しいと思われます。`One thing I've observed is`の訳文には、`observe`（観察する）が`observe`（オブザーブする）という間違いがありますが、それ以外は、ほぼ正しいと思われます。",
      wrongWords: ["observe"],
      results: [
        {
          from: "One thing I've observed is",
          answer: "私が観察したことの一つは",
          score: 9,
        },
        {
          from: "people tend to struggle with the useEffect hook",
          answer: "人々はuseEffectフックを使うことで苦戦する傾向がある",
          score: 9,
        },
        {
          from: "and there are some common hang-ups for them",
          answer: "そのためによくあるトラブルがある",
          score: 10,
        },
        {
          from: "that I'd like to address here.",
          answer: "それらをここで取り上げたいと思います。",
          score: 10,
        },
      ],
    };
  });
