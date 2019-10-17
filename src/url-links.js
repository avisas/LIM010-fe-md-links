import { directoryExists } from './files-path.js';

const fetch = require('node-fetch');

const getListOfURLs = (strContentOfFile) => {
  const regexNameURL = /\[.*\]\(http.+\)/gm;
  return strContentOfFile.match(regexNameURL); // array of strings
};

const getURLFinalObject = (absPath, strNameAndURL) => {
  let name = strNameAndURL.match(/\[.*\]/gm); // ['[pepito5]']
  name = name[0].slice(1, -1); // retorna name puro.
  let url = strNameAndURL.match(/\(http.+\)/gm); // ['(http://wb.com)']
  url = url[0].slice(1, -1); // retorna url puro.
  const { status, codeStatus } = validateURL(url);
  return {
    name, url, absPath, status, codeStatus,
  };
};

const validateURL = (url) => {
  let status = 'FAIL';
  let codeStatus = '404';

  fetch(url)
    .then((response) => {
      status = (response.ok) ? 'OK' : 'FAIL';
      codeStatus = response.status;
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });

  return { status, codeStatus };
};

const calculateStats = (listOfAllURLs) => {
  const total = listOfAllURLs.length;
  const unique = (new Set(listOfAllURLs.map((objUrl) => objUrl.url))).size;
  const broken = listOfAllURLs.filter((objUrl) => objUrl.status !== 'OK');

  return { total, unique, broken };
};

const extractLinksFromMdFiles = (paths) => {
  let linksOfMdFiles = [];
  if (validateDirectory(paths)) {
    // const allFilesPaths = getFilePaths(paths);
    // const markdownFiles = readAllMarkdownFiles(allFilesPaths);
    // linksOfMdFiles = extractLinks(markdownFiles); // falta crear función
  } else {
    linksOfMdFiles = 'No existe el directorio especificado';
  }
  return linksOfMdFiles;
};

export {
  getListOfURLs, getURLFinalObject, validateURL, calculateStats, extractLinksFromMdFiles,
};
