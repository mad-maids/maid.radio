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

export const promptError = async (ctx: TelegrafContext) =>
  await ctx.replyWithHTML(`Bot wasn't able to process`, {
    reply_markup: Markup.inlineKeyboard([
      Markup.urlButton(`Go to support team`, `https://t.me/madmaids`),
    ]),
  });
