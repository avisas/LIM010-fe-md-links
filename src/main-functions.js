const path = require('path');
const fs = require('fs');
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

const getAbsolutePath = (thePath) => ((path.isAbsolute(thePath)) ? thePath : path.resolve(thePath));

const isFile = (thePath) => fs.statSync(thePath).isFile();
exports.isFile = isFile;

const isDirectory = (thePath) => fs.statSync(thePath).isDirectory();
exports.isDirectory = isDirectory;

const isMd = (file) => path.extname(file) === '.md'; // return a extension as a string.
exports.isMd = isMd;

export const validateURL = (url) => {
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
  let total = listOfAllURLs.length;
  let unique = (new Set(listOfAllURLs.map((objUrl) => objUrl.url))).size;
  let broken = listOfAllURLs.filter((objUrl) => objUrl.status !== 'OK');

  return { total, unique, broken };
};
