import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";

composer.command("pending", async (ctx: TelegrafContext) => {
  const content = await dungeon.pending();
  if (!content) return await ctx.replyWithHTML(`Queue is clear!`);
  if (content)
    return await ctx.replyWithVoice(content.file, {
      parse_mode: "HTML",
      caption: `Would you like to send this voice to channel?`,
      reply_markup: Markup.inlineKeyboard([
        Markup.callbackButton(`No`, `admin_no_${content.id}`),
        Markup.callbackButton(`Yes`, `admin_yes_${content.id}`),
      ]),
    });
});

middleware(composer);
consoles.module(__filename);
