import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";

composer.action(/admin_(yes|no)_(.*)/gi, async (ctx: TelegrafContext) => {
  const prompt = ctx.match[1],
    message = await dungeon.get(parseInt(ctx.match[2]));

  console.log(prompt, message);
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
      await dungeon.del(message.id);
    }

    if (prompt === "no") {
      await resource.actionDeclined(ctx, message);
      await dungeon.del(message.id);
      await ctx.deleteMessage();
    }
  } catch (e) {
    console.log(e);
    return await resource.error(ctx);
  }
});

middleware(composer);
consoles.module(__filename);
