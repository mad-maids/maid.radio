import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";

composer.command("about", async (ctx: TelegrafContext) => {
  await ctx.replyWithHTML(resource.message, {
    reply_markup: resource.keyboard,
    disable_web_page_preview: true,
  });
});

middleware(composer);
consoles.module(__filename);
