import { composer, middleware, dungeon } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import * as resource from "./resource";

composer.action(
  /(voice|audio)_(yes|no)_(.*)/gi,
  async (ctx: TelegrafContext) => {
    const type = ctx.match[1],
      prompt = ctx.match[2],
      message = await dungeon.get(parseInt(ctx.match[3]));

    if (prompt === "yes") {
      try {
        switch (type) {
          case "voice":
            await ctx.telegram.sendVoice(process.env.ADMIN, message.file, {
              parse_mode: "HTML",
              caption: resource.actionMessage(type, ctx),
              reply_markup: resource.actionKeyboard(message),
            });
            break;
          case "audio":
            await ctx.telegram.sendAudio(process.env.ADMIN, message.file, {
              parse_mode: "HTML",
              caption: resource.actionMessage(type, ctx),
              reply_markup: resource.actionKeyboard(message),
            });
            break;
          default:
            return await resource.error(ctx);
        }
        await ctx.deleteMessage();
        return resource.actionEnd(ctx);
      } catch (_) {
        return await resource.error(ctx);
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
        return await resource.error(ctx);
      }
    }
  }
);

middleware(composer);
consoles.module(__filename);
