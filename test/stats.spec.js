const path = require('path');
const stat = require('../src/stats.js');

const array = [
  {
    href: 'https://docs.npmjs.com/about-npm/', text: 'nodeJs', route: path.join(process.cwd(), 'dir-test', 'first.md'), status: 200, statusText: 'OK',
  },
  {
    href: 'https://docs.npmjs.com/aboutnpm/', text: 'nodeJs', route: path.join(process.cwd(), 'dir-test', 'first.md'), status: 404, statusText: 'FAIL',
  },
  {
    href: 'https://docsnpmjs.com/aboutnpm/', text: 'nodeJs', route: path.join(process.cwd(), 'dir-test', 'first.md'), status: 'ERR', statusText: 'FAIL',
  },
  {
    href: 'https://docsnpmjs.com/aboutnpm/', text: 'nodeJs', route: path.join(process.cwd(), 'dir-test', 'first.md'), status: 'ERR', statusText: 'FAIL',
  },
];

describe('Broken links', () => {
  it('Debería retornar function', (done) => {
    expect(typeof stat.brokenLinks).toBe('function');
    done();
  });
  it('Debería retornar la cantidad de links rotos', (done) => {
    expect(stat.brokenLinks(array)).toBe(3);
    done();
  });
});

describe('Broken links', () => {
  it('Debería retornar function', (done) => {
    expect(typeof stat.uniquesLinks).toBe('function');
    done();
  });
  it('Debería retornar la cantidad de links unicos', (done) => {
    expect(stat.uniquesLinks(array)).toBe(3);
    done();
  });
});
