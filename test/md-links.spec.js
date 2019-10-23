const path = require('path');
const mdLinks = require('../src/md-links.js');
const fetchMock = require('../__mocks__/node-fetch.js');

fetchMock.config.sendAsJson = false;
fetchMock
  .mock('https://es.wikipedia.org/wiki/Markdown', 200)
  .mock('https://github.com', 200)
  .mock('https://eswikipedia.org/wiki/Markdown', () => {
    throw new Error('ERROR_MESSAGE');
  })
  .mock('http://www.wheresrhys.co.uk/fetch-mock_reset', 404);

const output1 = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: '1',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://github.com',
    text: '2',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://eswikipedia.org/wiki/Markdown',
    text: '3',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
    status: 'ERR',
    statusText: 'FAIL',
  },
  {
    href: 'http://www.wheresrhys.co.uk/fetch-mock_reset',
    text: '4',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
    status: 404,
    statusText: 'FAIL',
  }];

const output2 = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: '1',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
  },
  {
    href: 'https://github.com',
    text: '2',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
  },
  {
    href: 'https://eswikipedia.org/wiki/Markdown',
    text: '3',
    path: path.join(process.cwd(), 'dir-test', 'first.md'),
  },
  {
    href: 'http://www.wheresrhys.co.uk/fetch-mock_reset',
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
