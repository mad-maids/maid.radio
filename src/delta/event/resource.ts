import { Markup } from "telegraf";
import { TelegrafContext } from "@type/telegraf";

export const promptMessage = (type: "audio" | "voice") =>
  `Do you really want to send this ${type} message?`;

export const promptKeyboard = (type: "audio" | "voice", content) =>
  Markup.inlineKeyboard([
    [
      Markup.callbackButton(`No`, `${type}_no_${content[0].id}`),
      Markup.callbackButton(`Yes`, `${type}_yes_${content[0].id}`),
    ],
  ]);

export const error = async (ctx: TelegrafContext) =>
  await ctx.replyWithHTML(
    `Seems like bot is malfunctioning. Please, come back little bit later...`,
    {
      reply_markup: Markup.inlineKeyboard([
        Markup.urlButton(`Go to support team`, `https://t.me/madmaids`),
      ]),
    }
  );

export const actionMessage = (type: string, ctx: TelegrafContext) =>
  `${
    type[0].toLocaleUpperCase() + type.slice(1)
  } received by <a href="tg://user?id=${ctx.from.id}">${
    ctx.from.first_name
  }</a>`;

export const actionKeyboard = (message) =>
  Markup.inlineKeyboard([
    [
      Markup.callbackButton(`No`, `admin_no_${message.id}`),
      Markup.callbackButton(`Yes`, `admin_yes_${message.id}`),
    ],
  ]);

export const actionEnd = async (ctx: TelegrafContext) =>
  await ctx.replyWithHTML(
    `Voice has been sent! Thanks for using our service...`
  );
