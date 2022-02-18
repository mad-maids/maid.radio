import { Markup } from "telegraf";
import { TelegrafContext } from "@type/telegraf";
import { dungeon } from "@src/core";

export const actionMessage = async (type: "audio" | "voice") =>
  `#${await dungeon.count("up")} ${type} received\nRate it with emotions!`;

export const actionKeyboard = (type: "audio" | "voice", ctx: TelegrafContext) =>
  Markup.inlineKeyboard([
    [Markup.urlButton(`More at Radio WIUT`, `https://t.me/wiutinfo`)],
    [
      Markup.urlButton(
        `Send your own ${type}`,
        `https://t.me/${ctx.botInfo.username}`
      ),
    ],
  ]);

export const actionDeclined = async (ctx: TelegrafContext, content) => {
  const base = (type: string) =>
    `We are so sorry. Your ${type} couldn't make out it's way to our channel. Seems like it has things that breaks some of our guidelines! You can read our rules on /rules command.`;
  switch (content.type) {
    case "voice":
      return await ctx.telegram.sendVoice(content.chat, content.file, {
        caption: base(content.type),
      });
    case "audio":
      return await ctx.telegram.sendAudio(content.chat, content.file, {
        caption: base(content.type),
      });
    default:
      return await ctx.telegram.sendMessage(
        content.chat,
        `Seems like, the content that you sent us had invalid type of data`,
        {
          parse_mode: "HTML",
        }
      );
  }
};

export const pendingMessage = `Would you like to send this to the channel?\``;

export const pendingKeyboard = (content) =>
  Markup.inlineKeyboard([
    Markup.callbackButton(`No`, `admin_no_${content.id}`),
    Markup.callbackButton(`Yes`, `admin_yes_${content.id}`),
  ]);

export const pendingError = async (ctx: TelegrafContext) =>
  await ctx.replyWithHTML(
    `Ugh, we got unknown type of content here... Moder attention required!`,
    {
      reply_markup: Markup.inlineKeyboard([
        Markup.urlButton(`Go to support team`, `https://t.me/madmaids`),
      ]),
    }
  );

export const error = async (ctx: TelegrafContext) =>
  await ctx.replyWithHTML(
    `Seems like bot is malfunctioning. Please, come back little bit later...`,
    {
      reply_markup: Markup.inlineKeyboard([
        Markup.urlButton(`Go to support team`, `https://t.me/madmaids`),
      ]),
    }
  );
