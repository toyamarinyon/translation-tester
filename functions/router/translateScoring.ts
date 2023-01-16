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
    await new Promise((r) => setTimeout(r, 1000));
    return {
      score: 2,
      comment:
        "訳文は大部分が正しいと思われますが、「ゲームのペースはゆったりで、オープンワールドは変化しないので、暇なプレイヤーもいるかもしれませんが、そうじゃないユーザーにとっては、とてもいいものです。」という箇所が原文の意味を誤り、不明瞭に訳されています。",
      wrongWords: [],
      exampleTranslation:
        "Death StrandingのPCバージョンは本当に傑作です。ゲームのペースはリラックスしており、オープンワールドは不変であるため、それを制覇するためには大変な努力や忍耐が必要です。これは一部のプレイヤーには退屈に感じるかもしれませんが、他の人にとっては大きな報酬になるでしょう。なぜなら、私たちの足跡は、小さなものであってもゲームの世界に影響を与えるからです。",
    };
  });
