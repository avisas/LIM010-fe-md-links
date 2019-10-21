const fetch = require('node-fetch');
const fs = require('fs');

const validateURL = (url, callback) => {
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

const getListOfURLs = (strContentOfFile) => {
  const regexNameURL = /\[.*\]\(http.+\)/gm;
  return strContentOfFile.match(regexNameURL); // array of strings
};

const getURLFinalObject = (file, strNameAndURL, callback) => {
  let text = strNameAndURL.match(/\[.*\]/gm); // ['[pepito5]']
  text = text[0].slice(1, -1); // retorna name puro.
  let url = strNameAndURL.match(/\(http.+\)/gm); // ['(http://wb.com)']
  url = url[0].slice(1, -1); // retorna url puro.
  validateURL(url, (responseObject) => {
    const status = responseObject.status;
    const codeStatus = responseObject.codeStatus;
    callback({
      text, url, file, status, codeStatus,
    });
  });
};

const readFileOptions = {
  encoding: 'utf8',
  flag: 'r',
};

const getListOfURLProperties = (markdownFiles = [], callback) => {
  const output = [];
  markdownFiles.forEach((mdFilePath) => {
    fs.readFile(mdFilePath, readFileOptions, (error, fileContent) => {
      if (error) throw error;
      const unProcessedListOfNamesAndURLs = getListOfURLs(fileContent); // acceder a todo su contenido
      unProcessedListOfNamesAndURLs.forEach((nameAndURL) => {
        getURLFinalObject(mdFilePath, nameAndURL, (objProperties) => {
          console.log(objProperties);
          output.push(objProperties);
          console.log(output.length);
          callback(output);
        });
      });
    });
  });
};

getListOfURLProperties(['C:\\Users\\Alejandra\\Downloads\\README.md'], (response) => {
  // console.log(response);
  console.log(`LONGITUD FINAL DE CONSOLE LOG: ${response.length}`);
});

// const rootPath = 'C:\\Users\\Alejandra\\Downloads';

// console.log(rootPath);

// fs.readdir(rootPath, function (err, items) {
//   console.log(items);
//   for (let i = 0; i < items.length; i++) {
//     console.log(`item: ${items[i]}, isdirectory: ${isDirectory(path.join(rootPath, items[i]))},
//  ismdFile: ${isMdFile(path.join(rootPath, items[i]))}`);
//   }
// });
