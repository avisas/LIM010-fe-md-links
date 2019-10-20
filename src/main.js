import { isMdFile, isDirectory, getAbsolutePath } from "./files-path";
import { getListOfURLs, getURLFinalObject } from './url-links.js';

const fs = require('fs');
const inputUserPath = 'c:/users/Alejandra/Downloads/myPath';
const options = {
  stats: false,
  validate: false
};

const main = (inputUserPath, options) => {
  const listOfMarkdownFiles = [];
  updateListOfMarkdownFiles(listOfMarkdownFiles, inputUserPath); // ['absPath1/file1.md', 'absPath2/file2.md', ...]
  const listOfURLProperties = getListOfURLProperties(listOfMarkdownFiles); // []
  printConsole(listOfURLProperties, options);
};

const updateListOfMarkdownFiles = (listOfMarkdownFiles = [], path = '') => {
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

const getListOfURLProperties = (markdownFiles = []) => {
  const output = [];
  markdownFiles.forEach(mdFilePath => {
    unProcessedListOfNamesAndURLs = getListOfURLs(mdFilePath.content()); //acceder a todo su contenido
    unProcessedListOfNamesAndURLs.forEach(nameAndURL => {
      output.push(getURLFinalObject(mdFilePath, nameAndURL));
    });
  });
  return output;
};

export { main, updateListOfMarkdownFiles, getListOfURLProperties };


