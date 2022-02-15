import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";

composer.action(/admin_(yes|no)_(.*)/gi, async (ctx: TelegrafContext) => {
  const prompt = ctx.match[1],
    message = await dungeon.get(parseInt(ctx.match[2]));
  try {
    if (prompt === "yes") {
      await ctx.deleteMessage();
      switch (message.type) {
        case "voice":
          await ctx.telegram.sendVoice(process.env.STREAM, message.file, {
            parse_mode: "HTML",
            caption: await resource.actionMessage(message.type),
            reply_markup: resource.actionKeyboard(message.type, ctx),
          });
          break;
        case "audio":
          await ctx.telegram.sendAudio(process.env.STREAM, message.file, {
            parse_mode: "HTML",
            caption: await resource.actionMessage(message.type),
            reply_markup: resource.actionKeyboard(message.type, ctx),
          });
          break;
      }
      await dungeon.del(parseInt(ctx.match[1]));
    }

    if (prompt === "no") {
      const content = await dungeon.get(parseInt(ctx.match[1]));
      await resource.actionDeclined(ctx, content);
      await dungeon.del(parseInt(ctx.match[1]));
      await ctx.deleteMessage();
    }
  } catch (_) {
    console.error();
    return await resource.error(ctx);
  }
});

middleware(composer);
consoles.module(__filename);
