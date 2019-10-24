const fetch = require('node-fetch');
const routes = require('../src/main.js');

const validateLink = (route) => {
  const arrayOfLinks = routes.saveLinksMds(route);
  const arrayPromises = arrayOfLinks.map((link) => fetch(link.href)
    .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        return {
          ...link,
          status: response.status,
          statusText: response.statusText,
        };
      }
      return {
        ...link,
        status: response.status,
        statusText: 'FAIL',
      };
    })
    .catch(() => ({
      ...link,
      status: 'ERR',
      statusText: 'FAIL',
    })));
  return Promise.all(arrayPromises);
};

module.exports = {
  validateLink,
};
/*
const obj = {
  name: 'alba',
  colores: {
    fist: 'red',
    second: 'negro'
  }
}

const copia = {...obj, colores: {...obj.colores}}

copia.colores.fist  = 'green'

console.log(obj)
*/
