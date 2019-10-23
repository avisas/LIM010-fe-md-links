import { isMdFile, isDirectory, getAbsolutePath } from "./files-path";
import { getListOfURLs, getURLFinalObject } from './url-links.js';

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const inputUserPath = 'c:/users/Alejandra/Downloads/myPath';
const options = {
  stats: false,
  validate: false
};

export const mdLinks = (inputUserPath, options) => {
  const listOfMarkdownFiles = [];
  updateListOfMarkdownFiles(listOfMarkdownFiles, getAbsolutePath(inputUserPath)); // ['absPath1/file1.md', 'absPath2/file2.md', ...]
  getListOfURLProperties(listOfMarkdownFiles, (listOfURLProperties) => {
      printConsole(listOfURLProperties, options); 
  });
};

export const printConsole = (listOfURLProperties, options) => {
  // pendiente de hacer
};

export const updateListOfMarkdownFiles = (listOfMarkdownFiles = [], path = '') => {
  if (isMdFile(path)) {
    listOfMarkdownFiles.push(getAbsolutePath(path));
  } else if (isDirectory(path)) {
    fs.readdir(path, (error, childItems) => {
      if (error) {
        console.log(error);
      } else {  // if it's a directory then check each child item within
        console.log(childItems);
        childItems.forEach(childItem => updateListOfMarkdownFiles(listOfMarkdownFiles, path.join(path, childItem)));
      }
    });
  };
};

const readFileOptions = {
  encoding: 'utf8',
  flag: 'r'
};

export const getListOfURLProperties = (markdownFiles = [], callback) => {
  const output = [];
  markdownFiles.forEach(mdFilePath => {
      fs.readFile(mdFilePath, readFileOptions, (error, fileContent) => {
          if (error) throw error;
          let unProcessedListOfNamesAndURLs = getListOfURLs(fileContent); //acceder a todo su contenido
          unProcessedListOfNamesAndURLs.forEach(nameAndURL => {
              getURLFinalObject(mdFilePath, nameAndURL, (objProperties) => {
                  output.push(objProperties);
                  callback(output);
              });
          });            
      });
  });
};

export const validateURL = (url, callback) => {
  fetch(url)
    .then((response) => {
      const status = (response.ok) ? 'OK' : 'FAIL';
      const codeStatus = response.status;
      callback({ status, codeStatus });
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
};

export const getListOfURLs = (strContentOfFile) => {
  const regexNameURL = /\[.*\]\(http.+\)/gm;
  return strContentOfFile.match(regexNameURL); // array of strings
};

export const getURLFinalObject = (file, strNameAndURL, callback) => {
  let text = strNameAndURL.match(/\[.*\]/gm); // ['[pepito5]']
  text = text[0].slice(1, -1); // retorna name puro.
  let href = strNameAndURL.match(/\(http.+\)/gm); // ['(http://wb.com)']
  href = href[0].slice(1, -1); // retorna href puro.
  validateURL(href, (responseObject) => {
    const status = responseObject.status;
    const codeStatus = responseObject.codeStatus;
    callback({
      text, href, file, status, codeStatus,
    });
  });
};

export const calculateStats = (listOfAllURLs) => {
  const total = listOfAllURLs.length;
  const unique = (new Set(listOfAllURLs.map((objUrl) => objUrl.url))).size;
  const broken = listOfAllURLs.filter((objUrl) => objUrl.status !== 'OK');

  return { total, unique, broken };
};

export const directoryExists = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const getAbsolutePath = (thePath) => ((path.isAbsolute(thePath)) ? thePath : path.resolve(thePath));

export const isMdFile = (thePath) => {
  if (fs.statSync(thePath).isFile()) {
    if (path.extname(thePath) === '.md') {
      return true;
    }
  }
  return false;
};

export const isDirectory = (thePath) => fs.statSync(thePath).isDirectory();

export const findAllMarkdownFiles = (filePathList) => {
  const markdownFiles = [];
  filePathList.forEach((file) => {
    if (path.extname(file).toLowerCase() === '.md' || path.extname(file).toLowerCase() === '.markdown') {
      markdownFiles.push(file);
    }
  });
  return markdownFiles;
};
