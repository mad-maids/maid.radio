import { Markup } from "telegraf";

export const message =
  `<b>Everything is good when there exist discipline!</b>` +
  `\n` +
  `\n` +
  `<b>It's strictly prohibited to:</b>` +
  `\n` +
  `<code>* Send voice messages with offensive words</code>` +
  `\n` +
  `<code>* Send annoying, loud or high pitch noises (anime girls moanings are accepted...)</code>` +
  `\n` +
  `<code>* Send audio or voice message with sexual, political, religious, offensive discussions</code>` +
  `\n` +
  `<code>* Send audio or voice message with trolling, spamming, flirting, dating, flaming, sexism, ` +
  `racism, hate speech, witch hunting, oppai targeting, hentai magical & cursed numbers.</code>` +
  `\n` +
  `\n` +
  `<b>Follow the rules and your audio and voice message will be delivered to our awesome channel without having any kind of problem!</b>`;

export const keyboard = Markup.inlineKeyboard([
  [Markup.callbackButton("More commands...", "help")],
]);
