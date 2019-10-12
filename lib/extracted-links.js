const path = require('path');
const fs = require('fs');

const getListOfURLs = (strContentOfFile) => {
  const regexNameURL = /\[.*\]\(http.+\)/gm;
  return strContentOfFile.match(regexNameURL);  // array of strings
};

const getNameAndURL = (strNameAndURL) => {
  let name = strNameAndURL.match(/\[.*\]/gm); // ['[pepito5]']
  name = name[0].slice(1,-1);  // retorna name puro.
  let url = strNameAndURL.match(/\(http.+\)/gm); // ['(http://wb.com)']
  url = url[0].slice(1,-1);  // retorna url puro.  
  return { name, url };  //object con dos properties
};

const getAbsolutePath = (relativePath) => {

};


const extractedLinks = (filesPaths) => {
  const extractedLinksInArray = [];

  filesPaths.forEach((uniquePath) => {
    const onlyOneFileContent = fs.readFileSync(uniquePath).toString();
    // const linkRegExpInMd = /\[(.+)\]\(([^ ]+)(?: "(.+)")?\)/g;
    // eslint-disable-next-line no-empty-character-class
    const regexNameURL = /\[.+\]\(http.+\)/gm;
    const everyLink = onlyOneFileContent.toString().match(linkRegExpInMd);
    ['[ybybuyubuy](http://uuhu.in)', '']

    const linkRegExp = /\(([^ ]+)(?: "(.+)")?\)/gm;
    const textRegExp = /\[.+\]/gm;

    everyLink.forEach((link) => {
      const linkObj = {
        href: link.match(linkRegExp).toString().replace('(', '').replace(')', ''),
        text: link.match(textRegExp).toString().replace('[', '').replace(']', ''),
        file: path.dirname(uniquePath).toString(),
      };
      extractedLinksInArray.push(linkObj);
    });
  });
  return extractedLinksInArray;
};

const validateDirectory = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

