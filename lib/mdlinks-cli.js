const cli = require('../src/cli.js');

const [, , route, option1, option2] = process.argv;

cli.showCli(route, option1, option2)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
