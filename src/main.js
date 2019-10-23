const marked = require('marked');
const path = require('path');
const fs = require('fs');

const getAbsolutePath = (route) => (path.isAbsolute(route) ? route : path.resolve(route));

const isDirectory = (route) => fs.statSync(route).isDirectory();

const isFile = (route) => fs.statSync(route).isFile();

const isMd = (route) => (path.extname(route) === '.md');

const searchMds = (routeFile) => {
  const route = getAbsolutePath(routeFile);
  let arrayFileMd = [];
  if (isFile(route)) {
    if (isMd(route)) {
      arrayFileMd.push(route);
    }
  } else {
    const listOfFiles = fs.readdirSync(route);
    listOfFiles.forEach((file) => {
      arrayFileMd = arrayFileMd.concat(searchMds(path.join(route, file)));
    });
  }
  return arrayFileMd;
};

const saveLinksMds = (inputRoute) => {
  const arrayOfRoutes = searchMds(inputRoute);
  const arrayofLinks = [];
  arrayOfRoutes.forEach((route) => {
    const render = new marked.Renderer();
    const file = fs.readFileSync(route);
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
