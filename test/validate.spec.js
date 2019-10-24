const path = require('path');
const fetchMock = require('fetch-mock');
const validate = require('../src/validate.js');


const route = 'dir-test';
const output = [
  {
    href: 'https://www.markdownguide.org/getting-started/', path: path.join(process.cwd(), 'dir-test', 'first.md'), status: 200, statusText: 'OK', text: '1',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript', path: path.join(process.cwd(), 'dir-test', 'first.md'), status: 200, statusText: 'OK', text: '2',
  },
  {
    href: 'https://hackwild.com/article/creating-a-command', path: path.join(process.cwd(), 'dir-test', 'first.md'), status: 'ERR', statusText: 'FAIL', text: '3',
  },
  {
    href: 'https://medium.com/@josephcardillo/the-difference', path: path.join(process.cwd(), 'dir-test', 'first.md'), status: 404, statusText: 'FAIL', text: '4',
  }];

describe('Validate link', () => {
  fetchMock
    .mock('https://www.markdownguide.org/getting-started/', 200)
    .mock('https://developer.mozilla.org/es/docs/Web/JavaScript', 200)
    .mock('https://hackwild.com/article/creating-a-command', () => {
      throw new Error('ERROR_MESSAGE');
    })
    .mock('https://medium.com/@josephcardillo/the-difference', 404);
  it('Debería retornar function', (done) => {
    expect(typeof validate.validateLink).toBe('function');
    done();
  });
  it('Deberia retornar status 200 para un link disponible', (done) => {
    validate.validateLink(route)
      .then((response) => {
        expect(response).toStrictEqual(output);
        done();
      });
  });
});
