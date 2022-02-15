import { composer, middleware, dungeon } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { Markup } from "telegraf";
import { promptError } from "./resource";

composer.on(["voice", "audio"], async (ctx: TelegrafContext) => {
  if (ctx.chat.type === "private") {
    const type = ctx.message.voice ? "voice" : "audio";

    const content = await dungeon
      .set(ctx.message.voice.file_id, ctx.chat.id, type)
      .catch(async (_) => await promptError(ctx));

    switch (ctx.message.voice ? "voice" : "audio") {
      case "audio":
        return await ctx
          .replyWithAudio(ctx.message.voice.file_id, {
            caption: resource.promptMessage(type),
            reply_markup: resource.promptKeyboard(type, content),
          })
          .catch(async (_) => await promptError(ctx));
      case "voice":
        return await ctx
          .replyWithVoice(ctx.message.voice.file_id, {
            caption: resource.promptMessage(type),
            reply_markup: resource.promptKeyboard(type, content),
          })
          .catch(async (_) => await promptError(ctx));
      default:
        return await ctx.replyWithHTML(`Content type is not specified!`);
    }
  }
});

composer.action(
  /(voice|audio)_(yes|no)_(.*)/gi,
  async (ctx: TelegrafContext) => {
    const type = ctx.match[1],
      prompt = ctx.match[2],
      message = await dungeon.get(parseInt(ctx.match[3]));

    if (prompt === "yes") {
      try {
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
        await ctx.deleteMessage();
        return await ctx.replyWithHTML(
          `Voice has been sent! Thanks for using our service...`
        );
      } catch (_) {
        return await ctx.replyWithHTML(
          `Seems like bot is malfunctioning. Please, come back little bit later...`
        );
      }
    }

    if (prompt === "no") {
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
    }
  }
);

middleware(composer);
consoles.module(__filename);
