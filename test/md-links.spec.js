const path = require('path');
const mdLinks = require('../src/md-links.js');
const fetchMock = require('../__mocks__/node-fetchaa.js');

fetchMock.config.sendAsJson = false;
console.log('ESTE ES PRUEBA DE FETCHMOCK:', fetchMock.config);
fetchMock
  .mock('https://www.markdownguide.org/getting-started/', 200)
  .mock('https://developer.mozilla.org/es/docs/Web/JavaScript', 200)
  .mock('https://hackwildm/article/creating-a-command', () => {
    throw new Error('ERROR_MESSAGE');
  })
  .mock('https://medium.com/@josephcardillo/the-difference', 404);

const output1 = [
  {
    href: 'https://www.markdownguide.org/getting-started/',
    text: '1',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
    text: '2',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://hackwildm/article/creating-a-command',
    text: '3',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
    status: 'ERR',
    statusText: 'FAIL',
  },
  {
    href: 'https://medium.com/@josephcardillo/the-difference',
    text: '4',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
    status: 404,
    statusText: 'FAIL',
  }];

const output2 = [
  {
    href: 'https://www.markdownguide.org/getting-started/',
    text: '1',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
    text: '2',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
  },
  {
    href: 'https://hackwildm/article/creating-a-command',
    text: '3',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
  },
  {
    href: 'https://medium.com/@josephcardillo/the-difference',
    text: '4',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
  },
];

describe('Md links', () => {
  it('Debería retornar function', () => {
    expect(typeof mdLinks.mdLinks).toBe('function');
  });
  it('Debería retornar el link del primer elemento del array de links', () => {
    mdLinks.mdLinks(path.join(process.cwd(), 'dir-test'), { validate: false }).then((response) => {
      expect(response).toStrictEqual(output2);
    });
  });
  it('Debería retornar el link del primer elemento del array de links', (done) => {
    mdLinks.mdLinks('dir-test', { validate: false }).then((response) => {
      expect(response).toStrictEqual(output2);
      done();
    });
  });
  it('Debería retornar el link del primer elemento del array de links', (done) => {
    mdLinks.mdLinks(path.join(process.cwd(), 'dir-test'), { validate: true }).then((response) => {
      expect(response).toStrictEqual(output1);
      done();
    });
  });
  it('Debería retornar el link del primer elemento del array de links', (done) => {
    mdLinks.mdLinks(path.join(process.cwd(), 'dir-test', 'subdir', 'vacio'), '').then((response) => {
      expect(response.length).toBe(0);
      done();
    });
  });
});
