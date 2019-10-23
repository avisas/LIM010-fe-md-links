#!/usr/bin/env node
const commander = require('commander'); // const chalk = require('chalk');

const program = new commander.Command();

program.version('1.0.0').description('Evaluation of URLs within markdown files');
program.name('md-links').usage('[options]');
program.option('-r, --route <type>', 'Route to the folder or file to be examined');
program.option('-v, --validate', 'Validate identified URLs');
program.option('-s, --stats', 'Show basic statistics for the identified URLs.');
program.parse(process.argv);

const options = program.opts();
console.log(options);
console.log(`Route:${options.route}, Validate:${options.validate}, Stats:${options.stats}`);
