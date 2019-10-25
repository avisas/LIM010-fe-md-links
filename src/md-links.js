const route = require('./main.js');

const validate = require('./validate.js');

const mdLinks = (inputPath, options) => new Promise((resolve) => {
  // console.log(`mdLinks-INPUTPATH: ${inputPath}`);
  // console.log(`mdLinks-OPTIONS: ${Object.entries(options)}`);
  const routeAbs = route.getAbsolutePath(inputPath);
  if (options.validate) {
    // console.log(`options.validate TRUE`);
    // const arrayOfLinks = route.saveLinksMds(routeAbs);
    resolve(validate.validateLink(routeAbs));
  } else {
    // console.log(`options.validate FALSE`);
    resolve(route.saveLinksMds(routeAbs));
  }
});

module.exports = {
  mdLinks,
};
