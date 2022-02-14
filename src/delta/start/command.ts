import { composer, middleware } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import * as resource from "./resource";

composer.start(async (ctx: TelegrafContext) => {
  return await ctx.replyWithHTML(`Hello ${ctx.chat.id}`, {
    reply_markup: resource.keyboard,
  });
});

middleware(composer);
consoles.module(__filename);
