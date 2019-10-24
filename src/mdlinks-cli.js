const chalk = require('chalk');
const mdLink = require('../src/md-links.js');
const stats = require('../src/stats.js');

const showCli = (options) => {
  console.log(`showCli: ${Object.entries(options)}`);
  return mdLink.mdLinks(options.route, options)
    .then((response) => {
      console.log(`mdLinks: ${response.length}`);
      let output = '';
      if (response.length === 0) {
        output += chalk.yellow('No se encontraron links o archivos md.');
      }
      if ((options.stats) && (options.validate)) {
        output = `\n${chalk.cyan('Total: ')} ${response.length} \n${chalk.cyan('Unique: ')} ${stats.uniquesLinks(response)} \n${chalk.cyan('Broken: ')} ${stats.brokenLinks(response)}`;
      }
      if ((options.stats) && (!options.validate)) {
        output = `\n${chalk.cyan('Total: ')} ${response.length} \n${chalk.cyan('Unique: ')} ${stats.uniquesLinks(response)}`;
      }
      if ((!options.stats) && (options.validate)) {
        response.forEach((objectLink) => {
          if (objectLink.statusText === 'OK') {
            output += `\n${chalk.bgBlue.black(objectLink.path)} ${chalk.magenta(objectLink.href)} ${chalk.green(objectLink.status)} ${chalk.bgGreen.black(objectLink.statusText)} ${chalk.yellow(objectLink.text)}`;
          } else {
            output += `\n${chalk.bgBlue.black(objectLink.path)} ${chalk.magenta(objectLink.href)} ${chalk.red(objectLink.status)} ${chalk.bgRed.black(objectLink.statusText)} ${chalk.yellow(objectLink.text)}`;
          }
        });
      }
      if ((!options.stats) && (!options.validate)) {
        response.forEach((objectLink) => {
          output += `\n${chalk.bgBlue.black(objectLink.path)} ${chalk.magenta(objectLink.href)} ${chalk.yellow(objectLink.text)}`;
        });
      }
      if ((!options.stats) && (!options.validate) && (!options.route)) {
        output = chalk.red('No se encontró el comando. Usa md-links --help para recibir información.');
      }
      console.log(`Output:(${output})`);
      return output;
    })
    .catch(() => chalk.yellow('Ingresa una ruta válida.'));
};

module.exports = {
  showCli,
};
