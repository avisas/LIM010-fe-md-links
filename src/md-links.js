const route = require('./main.js');

const validate = require('./validate.js');

const mdLinks = (inputPath, options) => new Promise((resolve) => {
  const routeAbs = route.getAbsolutePath(inputPath);
  if (options.validate === false) {
    resolve(route.saveLinksMds(routeAbs));
  } else {
    // const arrayOfLinks = route.saveLinksMds(routeAbs);
    resolve(validate.validateLink(routeAbs));
  }
});

module.exports = {
  mdLinks,
};
