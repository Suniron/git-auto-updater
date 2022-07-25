#!/usr/bin/env zx
/* eslint-disable no-undef */
import { $, chalk, echo, argv, cd } from "zx";

const helpMessage = `
* 
* == GIT UPDATE SCRIPT DOCUMENTATION ==
* 
* Arguments:
* - 'a' or 'action' => action to on pull success (default: do nothing).
* - 'b' or 'branches' => Git branches allowed to update (default: 'master,main').
* - 'v' or 'verbose' or 'quiet' => show more logs (default: false).
* - 'p' or 'path' => path to check and update (default to './').
* - 'h' or 'help' => show this help message.
*
* Created by Etienne BLANC (follow me at https://github.com/Suniron/)
*`;

// If help mode is detected, show instructions and exit program (ignore any other args):
if (argv.h || argv.help) {
  echo(helpMessage);
  process.exit();
}

// Disable verbose in $ commands:
$.verbose = argv.quiet ?? argv.verbose ?? argv.v;

// == UTILS ==
const logBase = (...t) => `${new Date().toISOString()} - ${t.join(" ")}`;
const logError = (...text) => echo(chalk.red(logBase(...text)));
const logInfo = (...text) => echo(chalk.blue(logBase(...text)));
const logWarning = (...text) => echo(chalk.yellow(logBase(...text)));
const logSuccess = (...text) => echo(chalk.green(logBase(...text)));

// == VARIABLES ==
// Allowed branche(s):
let ALLOWED_BRANCHES = ["master", "main"];
if (argv.branches) {
  if (typeof argv.branches !== "string") {
    logError("Argument 'branches' must be a string!");
    process.exit(1);
  }
  ALLOWED_BRANCHES = argv.branches.split(",").map((b) => b.trim());
} else if (argv.b) {
  if (typeof argv.b !== "string") {
    logError("Argument 'b' must be a string!");
    process.exit(1);
  }
  ALLOWED_BRANCHES = argv.b.split(",").map((b) => b.trim());
}

// Action on pull success:
const actionOnPullSuccess = argv.a ?? argv.action;

// Path to operate:
const path = argv.p ?? argv.path;

// == MAIN ==
// If needed, change directory:
if (path && typeof path === "string") {
  cd(path);
}

// Check if good current branch:
const currentGitBranch = (await $`git branch --show-current`).toString().trim();
if (!ALLOWED_BRANCHES.includes(currentGitBranch)) {
  logError(`Current branch must be '${ALLOWED_BRANCHES.join(",")}', not '${currentGitBranch}'!`);
  process.exit(1);
}

// Check if pull is needed:
const isUpdateAvailable = (await $`git remote update; git status -uno`).toString().includes("branch is up to date");
if (isUpdateAvailable) {
  logInfo("Application is up to date 😎");
  process.exit();
}

// Pull code...
$.verbose = true;
await $`git pull`;

// If needed, do action after pull:
if (actionOnPullSuccess) {
  try {
    await $`${actionOnPullSuccess}`;
  } catch (error) {
    logError(`Oups! An error has occured during action after pull (${actionOnPullSuccess}: "${error}") `);
  }
}

logSuccess("Application is updated ! 🥳");
