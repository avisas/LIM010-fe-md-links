#!/usr/bin/env node
const cli = require('../src/mdlinks-cli.js');

const [, , route, option1, option2] = process.argv;
// eslint-disable-next-line no-console
cli.showCli(route, option1, option2).then((result) => console.log(result));
