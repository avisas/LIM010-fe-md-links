const fetch = require('node-fetch');

export const getListOfURLs = (strContentOfFile) => {
  const regexNameURL = /\[.*\]\(http.+\)/gm;
  return strContentOfFile.match(regexNameURL); // array of strings
};

export const getURLFinalObject = (absPath, strNameAndURL) => {
  let text = strNameAndURL.match(/\[.*\]/gm); // ['[pepito5]']
  text = text[0].slice(1, -1); // retorna name puro.
  let url = strNameAndURL.match(/\(http.+\)/gm); // ['(http://wb.com)']
  url = url[0].slice(1, -1); // retorna url puro.
  const { status, codeStatus } = validateURL(url);
  return {
    text, url, absPath, status, codeStatus,
  };
};

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

export const calculateStats = (listOfAllURLs) => {
  const total = listOfAllURLs.length;
  const unique = (new Set(listOfAllURLs.map((objUrl) => objUrl.url))).size;
  const broken = listOfAllURLs.filter((objUrl) => objUrl.status !== 'OK');

  return { total, unique, broken };
};
