import { Markup } from "telegraf";

export const message =
  `<b>Briefly about the bot and its functionalities...</b>` +
  `\n` +
  `\n` +
  `<a href="https://t.me/wiutinfo">WIUT Radio Helper</a> - a telegram bot that helps students to send their message ` +
  `to a centralized telegram channel in voice or audio form and exchange their singing or ` +
  `audio things. It works similarly like confession things, but this platform targets only audio format of messages. ` +
  `The idea of this platform was created by <a href="https://t.me/malikaxafizova">Malika Khafizova</a> ` +
  `whilst the project was hosted & supported by team <a href="https://t.me/madmaids">Mad Maids</a>` +
  `\n` +
  `\n` +
  `Project is being maintained by <a href="https://t.me/malikaxafizova">Malika Khafizova</a> ` +
  `and any questions regarding project can be asked from her. If you experience ` +
  `failure or technical issues, please refer to the team <a href="https://t.me/madmaids">Mad Maids</a> immediately!`;

export const keyboard = Markup.inlineKeyboard([
  [Markup.urlButton("Main Channel", "https://t.me/wiutinfo")],
  [Markup.urlButton("Administrator", "https://t.me/malikaxafizova")],
  [Markup.urlButton("Tech Support", "https://t.me/madmaids")],
]);
