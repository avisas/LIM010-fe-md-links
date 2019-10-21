const fetch = require('node-fetch');

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
