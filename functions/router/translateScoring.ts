import { ChatCompletionRequestMessage } from "openai";
import { z } from "zod";
import { t } from "../trpc";

const translateScoringCompletionScheme = z.object({
  score: z.number(),
  summary: z.string(),
  misses: z.array(z.object({ word: z.string(), reason: z.string() })),
  example: z.string(),
});

export const translateScoring = t.procedure
  .input(
    z.object({
      source: z.string(),
      translation: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    if (ctx.mock) {
      return {
        score: 3,
        summary: "翻訳は正しいです",
        misses: [
          {
            word: "strikes",
            reason:
              "strikes（打ち込む）」を「seems（見える）」に修正しましょう",
          },
          {
            word: "actually",
            reason:
              "「actually（実際）」を「basically（基本的に）」に修正しましょう",
          },
        ],
        example: "翻訳は正しいです",
      };
    }
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: `
        I want you to act as a translation evaluation API.
    I will provide some translations from English to Japanese, and it will be your job to check whether they are correct or incorrect and respond as a JSON Object, which are four fields.
    The first is a "score" representing the translation score on a 3-point scale.
    The second is "summary," which represents the summary of translation quality in Japanese.
    It would be nice to include a message supporting those studying English.
    The third is "misses," which represents where the errors are and explains why the translation is wrong as an array of objects with two fields: word and reason.
    The word field represents the word you missed in the translation in English, and the reason field represents the reason for the error and gives the correct translation.
    The last is "example," which represents an example translation in Japanese.
        `,
      },
      {
        role: "user",
        content: `
        ###
        {
          "english": "${input.source}",
          "japanese": "${input.translation}"
        }
        ###

        Response as JSON object:
        `,
      },
    ];

    const result = await ctx.ai.run("@cf/meta/llama-2-7b-chat-int8", {
      messages,
    });

    const safeResult = translateScoringCompletionScheme.parse(
      JSON.parse(result.response)
    );

    return safeResult;
  });
