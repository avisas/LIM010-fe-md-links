const marked = require('marked');
const path = require('path');
const fs = require('fs');

const getAbsolutePath = (route) => {
  if (route) {
    return (path.isAbsolute(route) ? route : path.resolve(route));
  }
  return '';
};

const isDirectory = (route) => fs.statSync(route).isDirectory();

const isFile = (route) => {
  try {
    return fs.statSync(route).isFile();
  } catch (err) {
    return false;
  }
};

const isMd = (route) => (path.extname(route) === '.md');

const getListOfFiles = (route) => {
  try {
    return fs.readdirSync(route);
  } catch (err) {
    return [];
  }
};

const searchMds = (routeFile) => {
  const route = getAbsolutePath(routeFile);
  let arrayFileMd = [];
  if (isFile(route)) {
    if (isMd(route)) {
      arrayFileMd.push(route);
    }
  } else {
    // const listOfFiles = fs.readdirSync(route);
    const listOfFiles = getListOfFiles(route);
    listOfFiles.forEach((file) => {
      arrayFileMd = arrayFileMd.concat(searchMds(path.join(route, file)));
    });
  }
  return arrayFileMd;
};

const readContentOfFile = (route) => {
  try {
    return fs.readFileSync(route);
  } catch (err) {
    return '';
  }
};

const saveLinksMds = (inputRoute) => {
  const arrayOfRoutes = searchMds(inputRoute);
  const arrayofLinks = [];
  const render = new marked.Renderer();
  arrayOfRoutes.forEach((route) => {
    // const file = fs.readFileSync(route);
    const file = readContentOfFile(route);
    render.link = (hrefFile, titleFile, textFile) => {
      arrayofLinks.push({
        href: hrefFile,
        text: textFile.substring(0, 50),
        path: route,
      });
    };
    marked(file.toString(), {
      renderer: render,
    });
  });
  return arrayofLinks;
};

module.exports = {
  getAbsolutePath,
  isDirectory,
  isFile,
  isMd,
  searchMds,
  saveLinksMds,
};
