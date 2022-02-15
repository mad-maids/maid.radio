import { composer, middleware, dungeon } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";
import { OnlyId } from "@type/dungeon";

composer.action(`help`, async (ctx: TelegrafContext) => {
  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
  console.log(admins.includes(ctx.from.id));
  await ctx.editMessageText(resource.message(admins.includes(ctx.from.id)), {
    parse_mode: "HTML",
    reply_markup: resource.keyboard,
  });
});

middleware(composer);
consoles.module(__filename);
