import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(`help`, async (ctx: TelegrafContext) => {
  return await ctx.replyWithHTML(`Hello ${ctx.chat.id}`, {
    reply_markup: resource.keyboard,
  });
});

middleware(composer);
consoles.module(__filename);
