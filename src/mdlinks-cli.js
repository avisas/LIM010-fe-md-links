const commander = require('commander');
const chalk = require('chalk');
const mdLink = require('../src/md-links.js');
const stat = require('../src/stats.js');

const program = new commander.Command();
program.version('2.0.0').description('Stadistics about markdown files');
program
  .name('md-links')
  .usage('[options]')
  .option('--validate', 'Valida todos los links dentro de un archivo MD.')
  .option('--stats', 'Muestra el total de links y el total de links únicos.')
  .option('--stats --validate', 'Muestra el total de links, el total de links únicos y rotos');
program.parse(process.argv);

const getOption = (option1, option2) => {
  if (option1 === '--validate' || option2 === '--validate') {
    return { validate: true };
  }
  if (option1 === '--stats' && option2 === '--stats') {
    return { stats: true };
  }
  return { validate: false };
};

const showCli = (route, option1, option2) => {
  const validate = getOption(option1, option2);
  return mdLink.mdLinks(route, validate)
    .then((response) => {
      let output = '';
      if (response.length === 0) {
        output += chalk.yellow('No se encontraron links o archivos md.');
      }
      if (option1 === '--stats' && option2 === '--validate') {
        output = `\n${chalk.cyan('Total: ')} ${response.length} \n${chalk.cyan('Unique: ')} ${stat.uniquesLinks(response)} \n${chalk.cyan('Broken: ')} ${stat.brokenLinks(response)}`;
      }
      if (option1 === '--stats' && option2 === undefined) {
        output = `\n${chalk.cyan('Total: ')} ${response.length} \n${chalk.cyan('Unique: ')} ${stat.uniquesLinks(response)}`;
      }
      if (option1 === '--validate' && option2 === undefined) {
        response.forEach((objectLink) => {
          if (objectLink.statusText === 'OK') {
            output += `\n${chalk.bgBlue.black(objectLink.path)} ${chalk.magenta(objectLink.href)} ${chalk.green(objectLink.status)} ${chalk.bgGreen.black(objectLink.statusText)} ${chalk.yellow(objectLink.text)}`;
          } else {
            output += `\n${chalk.bgBlue.black(objectLink.path)} ${chalk.magenta(objectLink.href)} ${chalk.red(objectLink.status)} ${chalk.bgRed.black(objectLink.statusText)} ${chalk.yellow(objectLink.text)}`;
          }
        });
      }
      if (option1 === undefined) {
        response.forEach((objectLink) => {
          output += `\n${chalk.bgBlue.black(objectLink.path)} ${chalk.magenta(objectLink.href)} ${chalk.yellow(objectLink.text)}`;
        });
      }
      if (option1 !== '--stats' && option1 !== '--validate' && option1 !== undefined) {
        output = chalk.red('No se encontró el comando. Usa md-links --help para recibir información.');
      }
      return output;
    })
    .catch(() => chalk.yellow('Ingresa una ruta válida.'));
};

module.exports = {
  showCli,
};
