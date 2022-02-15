import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";

composer.command("pending", async (ctx: TelegrafContext) => {
  const content = await dungeon.pending();
  if (!content) return await ctx.replyWithHTML(`Queue is clear!`);
  if (content)
    switch (content.type) {
      case "audio":
        return await ctx.replyWithAudio(content.file, {
          parse_mode: "HTML",
          caption: resource.pendingMessage,
          reply_markup: resource.pendingKeyboard(content),
        });
      case "voice":
        return await ctx.replyWithVoice(content.file, {
          parse_mode: "HTML",
          caption: resource.pendingMessage,
          reply_markup: resource.pendingKeyboard(content),
        });
      default:
        return await resource.pendingError(ctx);
    }
});

middleware(composer);
consoles.module(__filename);
