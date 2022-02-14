import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";

composer.action(/admin_yes_(.*)/gi, async (ctx: TelegrafContext) => {
  const message = await dungeon.get(parseInt(ctx.match[1]));
  const counter = await dungeon.count("up");
  try {
    await ctx.deleteMessage();
    await ctx.telegram.sendVoice(process.env.STREAM, message.file, {
      parse_mode: "HTML",
      caption: `#${counter} voice received\nRate it with emotions!`,
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.urlButton(
            `Send your own voice`,
            `https://t.me/${ctx.botInfo.username}`
          ),
        ],
      ]),
    });

    await dungeon.del(parseInt(ctx.match[1]));
  } catch (_) {
    return await ctx.replyWithHTML(
      `Couldn't send the request. Please, try a little bit later.`
    );
  }
});

composer.action(/admin_no_(.*)/gi, async (ctx: TelegrafContext) => {
  try {
    const content = await dungeon.get(parseInt(ctx.match[1]));
    await ctx.telegram.sendVoice(content.chat, content.file, {
      caption: `We are so sorry. Your voice couldn't make out it's way to our channel. Seems like it has things that breaks some of our guidelines!`,
    });
    await dungeon.del(parseInt(ctx.match[1]));
    await ctx.deleteMessage();
  } catch (_) {
    return await ctx.replyWithHTML(
      `Seems like bot is malfunctioning. Moderators attention is required...`
    );
  }
});

middleware(composer);
consoles.module(__filename);
