import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";

composer.action(/voice_yes_(.*)/gi, async (ctx: TelegrafContext) => {
  const message = await dungeon.get(parseInt(ctx.match[1]));
  try {
    await ctx.deleteMessage();
    await ctx.telegram.sendVoice(process.env.ADMIN, message.file, {
      parse_mode: "HTML",
      caption: `Voice received by <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a>`,
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton(`No`, `admin_no_${message.id}`),
          Markup.callbackButton(`Yes`, `admin_yes_${message.id}`),
        ],
      ]),
    });
    return await ctx.replyWithHTML(
      `Voice has been sent! Thanks for using our service...`
    );
  } catch (_) {
    return await ctx.replyWithHTML(
      `Couldn't send the request. Please, try a little bit later.`
    );
  }
});

composer.action(/voice_no_(.*)/gi, async (ctx: TelegrafContext) => {
  try {
    await dungeon.del(parseInt(ctx.match[1]));
    await ctx.deleteMessage();
    return await ctx.replyWithHTML(
      `<b>Alright, give it another shot and try your best!</b>`
    );
  } catch (_) {
    return await ctx.replyWithHTML(
      `Seems like bot is malfunctioning. Please, come back little bit later...`
    );
  }
});

middleware(composer);
consoles.module(__filename);
