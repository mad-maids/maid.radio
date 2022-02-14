import { composer, middleware, dungeon } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import { Markup } from "telegraf";

composer.on("voice", async (ctx: TelegrafContext) => {
  if (ctx.chat.type === "private") {
    try {
      const content = await dungeon.set(ctx.message.voice.file_id, ctx.chat.id);

      await ctx.replyWithVoice(ctx.message.voice.file_id, {
        caption: "Do you really want to send this voice?",
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.callbackButton(`No`, `voice_no_${content[0].id}`),
            Markup.callbackButton(`Yes`, `voice_yes_${content[0].id}`),
          ],
        ]),
      });
    } catch (_) {
      return await ctx.replyWithHTML(
        `Seems like bot is malfunctioning. Please, come back little bit later...`
      );
    }
  } else {
    return await ctx.replyWithHTML(
      `Appreciate your privacy! Send your messages from private chat...`,
      {
        reply_markup: Markup.inlineKeyboard([
          Markup.urlButton(
            `Go to Private Chat`,
            `https://t.me/${ctx.botInfo.username}`
          ),
        ]),
      }
    );
  }
});

middleware(composer);
consoles.module(__filename);
