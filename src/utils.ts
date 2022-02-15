/**
 * Console Input Manager
 * @module layouts/consoles
 */

import { basename, dirname, sep } from "path";
import chalk = require("chalk");
import { dungeon } from "@src/core";
import { OnlyId } from "@type/dungeon";
import { TelegrafContext } from "@type/telegraf";

export const isAdmin = async (ctx: TelegrafContext) => {
  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
  return admins.includes(ctx.from.id);
};

export const errors = (error: Error): void => {
  console.log(chalk.red("[ERROR]"), error);
};

export const module = (filename: string = __filename): void => {
  const modules =
    dirname(filename).split(sep).pop() + "/" + basename(filename, ".js");
  console.log(chalk.blue("[MODULE]"), modules);
};
