import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";
import { isAdmin } from "@src/utils";

composer.action(`help`, async (ctx: TelegrafContext) => {
  await ctx.editMessageText(resource.message(await isAdmin(ctx)), {
    parse_mode: "HTML",
    reply_markup: resource.keyboard,
  });
});

middleware(composer);
consoles.module(__filename);
