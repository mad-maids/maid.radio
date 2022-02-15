import { Markup } from "telegraf";

export const message = (isAdmin: boolean): string => {
  const base: string =
    `<b>List of available commands:</b>` +
    `\n` +
    `\n` +
    `/help - <code>show this helper message</code>` +
    `\n` +
    `/about - <code>detailed information about bot</code>` +
    `\n` +
    `\n` +
    `<b>Send audio content or message directly to process it!</b>`;

  const admin: string =
    `\n` +
    `\n` +
    `<b>Admin commands:</b>` +
    `\n` +
    `/pending - <code>review recently sent contents</code>` +
    `\n` +
    `\n` +
    `<i>Be careful! Restricted for non-admin users.` +
    ` Heavily checked and database tested zone</i>`;
  if (isAdmin) return base + admin;
  else return base;
};

export const keyboard = Markup.inlineKeyboard([
  [Markup.urlButton("Main Channel", "https://t.me/wiutinfo")],
]);
