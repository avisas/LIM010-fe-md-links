const chalk = require('chalk');
const path = require('path');
const fetchMock = require('fetch-mock');
const cli = require('../src/mdlinks-cli.js');
const fetchMock1 = require('../__mocks__/node-fetchaa.js');

fetchMock.config.sendAsJson = false;

const output1 = `
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://www.markdownguide.org/getting-started/')} ${chalk.yellow('1')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://developer.mozilla.org/es/docs/Web/JavaScript')} ${chalk.yellow('2')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://hackwildm/article/creating-a-command')} ${chalk.yellow('3')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://medium.com/@josephcardillo/the-difference')} ${chalk.yellow('4')}`;
const output2 = `\n${chalk.cyan('Total: ')} 4 \n${chalk.cyan('Unique: ')} 4`;

const output3 = `
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://www.markdownguide.org/getting-started/')} ${chalk.green('200')} ${chalk.bgGreen.black('OK')} ${chalk.yellow('1')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://developer.mozilla.org/es/docs/Web/JavaScript')} ${chalk.green('200')} ${chalk.bgGreen.black('OK')} ${chalk.yellow('2')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://hackwildm/article/creating-a-command')} ${chalk.green('ERR')} ${chalk.bgGreen.black('OK')} ${chalk.yellow('3')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://medium.com/@josephcardillo/the-difference')} ${chalk.red('404')} ${chalk.bgRed.black('FAIL')} ${chalk.yellow('4')}`;

describe('Command line', () => {
  fetchMock
    .mock('https://www.markdownguide.org/getting-started/', 200)
    .mock('https://developer.mozilla.org/es/docs/Web/JavaScript', 200)
    .mock('https://hackwildm/article/creating-a-command', 'ERR')
    .mock('https://medium.com/@josephcardillo/the-difference', 404);

  it('Debería retornar function', () => {
    expect(typeof cli.showCli).toBe('function');
  });
  it('Debería retornar la ruta, el link y el texto de todos los archivos MD', (done) => {
    cli.showCli({ route: 'dir-test', validate: undefined, stats: undefined }).then((response) => {
      expect(response).toBe(output1);
      done();
    });
  });
  it('Debería retornar la cantidad de links y la cantidad de links únicos', (done) => {
    cli.showCli({ route: 'dir-test', validate: undefined, stats: true }).then((response) => {
      expect(response).toBe(output2);
      done();
    });
  });
  it('Debería retornar la ruta, el link, el texto, el status y el statustext de todos los archivos MD', (done) => {
    cli.showCli({ route: 'dir-test/first.md', validate: true, stats: undefined }).then((response) => {
      expect(response).toStrictEqual(output3);
      done();
    });
  });
  it('Debería retornar la cantidad de links, la cantidad de links únicos y la cantidad de links rotos', (done) => {
    cli.showCli({ route: 'dir-test/first.md', validate: true, stats: true }).then((response) => {
      expect(response).toBe(`\n${chalk.cyan('Total: ')} 4 \n${chalk.cyan('Unique: ')} 4 \n${chalk.cyan('Broken: ')} 2`);
      done();
    });
  });
  it('Debería retornar no se encontró el comando si la opción es diferente de stats y validate', (done) => {
    cli.showCli({ route: undefined, validate: undefined, stats: undefined }).then((response) => {
      expect(response).toBe(chalk.red('No se encontró el comando. Usa md-links --help para recibir información.'));
      done();
    });
  });
  it('Debería retornar no se encontraron links en los archivos md', (done) => {
    cli.showCli({ route: 'dir-test/subdir/vacio', validate: undefined, stats: undefined }).then((response) => {
      expect(response).toBe(chalk.yellow('No se encontraron links o archivos md.'));
      done();
    });
  });
  it('Debería retornar no se encontraron links en los archivos md', (done) => {
    cli.showCli({ route: 'dir', validate: undefined, stats: undefined }).then((response) => {
      expect(response).toBe(chalk.yellow('No se encontraron links o archivos md.'));
      done();
    });
  });
});
