import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";

composer.action("about", async (ctx: TelegrafContext) => {
  await ctx.editMessageText(resource.message, {
    parse_mode: "HTML",
    reply_markup: resource.keyboard,
    disable_web_page_preview: true,
  });
});

middleware(composer);
consoles.module(__filename);
