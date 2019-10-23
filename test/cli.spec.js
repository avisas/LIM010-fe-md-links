const chalk = require('chalk');
const path = require('path');
const cli = require('../src/mdlinks-cli.js');
const fetchMock = require('../__mocks__/node-fetch.js');

fetchMock.config.sendAsJson = false;

const output1 = `
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://es.wikipedia.org/wiki/Markdown')} ${chalk.yellow('1')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://github.com')} ${chalk.yellow('2')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://eswikipedia.org/wiki/Markdown')} ${chalk.yellow('3')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('http://www.wheresrhys.co.uk/fetch-mock_reset')} ${chalk.yellow('4')}`;
const output2 = `\n${chalk.cyan('Total: ')} 4 \n${chalk.cyan('Unique: ')} 4`;

const output3 = `
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://es.wikipedia.org/wiki/Markdown')} ${chalk.green('200')} ${chalk.bgGreen.black('OK')} ${chalk.yellow('1')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://github.com')} ${chalk.green('200')} ${chalk.bgGreen.black('OK')} ${chalk.yellow('2')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('https://eswikipedia.org/wiki/Markdown')} ${chalk.green('200')} ${chalk.bgGreen.black('OK')} ${chalk.yellow('3')}
${chalk.bgBlue.black(path.join(process.cwd(), 'dir-test', 'first.md'))} ${chalk.magenta('http://www.wheresrhys.co.uk/fetch-mock_reset')} ${chalk.red('404')} ${chalk.bgRed.black('FAIL')} ${chalk.yellow('4')}`;

console.log('ESTO ES PRUEBA DE CWD!!!!!!!!!!!', process.cwd);

describe('Command line', () => {
  fetchMock
    .mock('https://www.markdownguide.org/getting-started/', 200)
    .mock('https://developer.mozilla.org/es/docs/Web/JavaScript', 200)
    .mock('https://hackwild.com/article/creating-a-command', 'ERR')
    .mock('https://medium.com/@josephcardillo/the-difference', 404);

  it('Debería retornar function', () => {
    expect(typeof cli.showCli).toBe('function');
  });
  it('Debería retornar la ruta, el link y el texto de todos los archivos MD', (done) => {
    cli.showCli('dir-test', undefined, undefined).then((response) => {
      expect(response).toBe(output1);
      done();
    });
  });
  it('Debería retornar la cantidad de links y la cantidad de links únicos', (done) => {
    cli.showCli('dir-test', '--stats', undefined).then((response) => {
      expect(response).toBe(output2);
      done();
    });
  });
  it('Debería retornar la ruta, el link, el texto, el status y el statustext de todos los archivos MD', (done) => {
    cli.showCli('dir-test', '--validate', undefined).then((response) => {
      expect(response).toStrictEqual(output3);
      done();
    });
  });
  it('Debería retornar la cantidad de links, la cantidad de links únicos y la cantidad de links rotos', (done) => {
    cli.showCli('dir-test', '--stats', '--validate').then((response) => {
      expect(response).toBe(`\n${chalk.cyan('Total: ')} 4 \n${chalk.cyan('Unique: ')} 4 \n${chalk.cyan('Broken: ')} 1`);
      done();
    });
  });
  it('Debería retornar no se encontró el comando si la opción es diferente de stats y validate', (done) => {
    cli.showCli('dir-test', 'a', undefined).then((response) => {
      expect(response).toBe(chalk.red('No se encontró el comando. Usa md-links --help para recibir información.'));
      done();
    });
  });
  it('Debería retornar no se encontraron links en los archivos md', (done) => {
    cli.showCli('dir-test/subdir/vacio', undefined, undefined).then((response) => {
      expect(response).toBe(chalk.yellow('No se encontraron links o archivos md.'));
      done();
    });
  });
  it('Debería retornar no se encontraron links en los archivos md', (done) => {
    cli.showCli('di', undefined, undefined).then((response) => {
      expect(response).toBe(chalk.yellow('Ingresa una ruta válida.'));
      done();
    });
  });
});
