import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";
import { OnlyId } from "@type/dungeon";

composer.help(async (ctx: TelegrafContext) => {
  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
  console.log(admins.includes(ctx.from.id));
  await ctx.replyWithHTML(resource.message(admins.includes(ctx.from.id)), {
    reply_markup: resource.keyboard,
  });
});

middleware(composer);
consoles.module(__filename);
