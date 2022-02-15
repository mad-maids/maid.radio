import { composer, middleware, dungeon } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import * as resource from "./resource";

composer.on(["voice", "audio"], async (ctx: TelegrafContext) => {
  if (ctx.chat.type === "private") {
    const type = ctx.message.voice ? "voice" : "audio";

    const content = await dungeon
      .set(ctx.message.voice.file_id, ctx.chat.id, type)
      .catch(async () => await resource.error(ctx));

    switch (ctx.message.voice ? "voice" : "audio") {
      case "audio":
        return await ctx
          .replyWithAudio(ctx.message.voice.file_id, {
            caption: resource.promptMessage(type),
            reply_markup: resource.promptKeyboard(type, content),
          })
          .catch(async () => await resource.error(ctx));
      case "voice":
        return await ctx
          .replyWithVoice(ctx.message.voice.file_id, {
            caption: resource.promptMessage(type),
            reply_markup: resource.promptKeyboard(type, content),
          })
          .catch(async () => await resource.error(ctx));
      default:
        return await ctx.replyWithHTML(`Content type is not specified!`);
    }
  }
});

middleware(composer);
consoles.module(__filename);
