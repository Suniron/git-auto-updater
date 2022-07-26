# Git Auto Updater

## Why ? 🤷‍♂️

I made this tool with the goal to have a simple and fiable way to update automatically my own projects like those hosted on my [Raspberry Pi](https://amzn.to/3PWeLRE) 🤓.

This tool can be used for any git projet, not only Node.js app ! 😉

## Prerequisites

- [Nodejs](https://nodejs.org/en/) 16 or higher.
- [Google zx package](https://github.com/google/zx) installed (_see installation bellow_).

## Installation 📦

### Globally (recommended)

This method is **recommended** because it can be used in any project.

1. Install [zx](https://github.com/google/zx) with `npm install -g zx`,
2. Put the `git-auto-updater.mjs` in a folder of your system,
3. Make the script executable with `chmod +x ./git-auto-updater.mjs`

### As a depency (Node.js  only)

This method is **not recommended** because it's for **Node.js project only**.

1. Install in project with `yarn install zx` or ``npm install zx`, depends of you package manager,
2. Put the `git-auto-updater.mjs` at the root of your project.
3. Make the script executable with `chmod +x ./git-auto-updater.mjs`

## How to use 🙂

1. Simply run the script with  `chmod +x ./git-auto-updater.mjs` in a project or add `-p` / `-path` if not used directly in a project

## Arguments

| Short arg | Long arg           | Utility                        | Default value         |
| ----------- | -------------------- | ------------------------------ | --------------------- |
| 'a'         | 'action'             | action to on pull success      | **undefined**         |
| 'b'         | 'branches'           | Git branches allowed to update | **'master,main' **    |
| 'v'         | 'verbose' or 'quiet' | show more logs                 | **false**             |
| 'p'         | 'path'               | path to check and update       | _shell launch folder_ |
| 'h'         | 'help'               | show the help message          | -                     |

## Tips 💡

Use a cron task to call automatically this script each hour for example ! ♻️

## Buy me a coffee 🍵

If you want (_and because i love the coffee 🥰_), [you can buy me a coffee](https://www.buymeacoffee.com/suniron) ❤️‍🔥

## TODO

- [ ] Add examples
- [ ] Can take multiple paths
