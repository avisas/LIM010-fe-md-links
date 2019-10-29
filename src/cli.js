#!/usr/bin/env node
const commander = require('commander');

const cli = require('../src/mdlinks-cli.js');

const program = new commander.Command();
program.version('1.0.0').description('Statistics about markdown files');
program.name('md-links').usage('[options]');
// program.option('-r, --route <type>', 'Muestra el total de rutas');
program.option('--validate', 'Valida todos los links dentro de un archivo MD.');
program.option('--stats', 'Muestra el total de links y el total de links únicos.');
// program.parse(process.argv);
const options = cli.readUserArguments(process.argv);
console.log(process.argv);
// eslint-disable-next-line no-console
cli.showCli(options).then((result) => console.log(result)).catch((error) => console.log(error));
