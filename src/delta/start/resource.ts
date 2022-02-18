import { Markup } from "telegraf";

export const message =
  `<b>Hello Dear Wiuterians!</b>` +
  `\n` +
  `\n` +
  `With the help of this bot, you can send your audios & voice messages that you would like to share with everyone at WIUT.` +
  `\n` +
  `\n` +
  `Send your audios or voices messages directly without hesitation. I hope you will enjoy this bot.` +
  `\n` +
  `\n` +
  `<i>In order to see full detailed usage information of the bot, press the button below.</i>`;

export const keyboard = Markup.inlineKeyboard([
  [Markup.callbackButton("Show more information", "help")],
  [Markup.callbackButton("Briefly about the bot", "about")],
]);
