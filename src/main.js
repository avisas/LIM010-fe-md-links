import { isMdFile, isDirectory, getAbsolutePath } from "./files-path";
import { getListOfURLs, getURLFinalObject } from './url-links.js';

const fs = require('fs');
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

