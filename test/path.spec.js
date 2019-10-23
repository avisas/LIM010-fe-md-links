const path = require('path');
const route = require('../src/main.js');

describe('Read the path', () => {
  it('Debería retornar function', () => {
    expect(typeof route.getAbsolutePath).toBe('function');
  });
  it('Debería retornar la ruta si ya es absoluta', () => {
    expect(route.getAbsolutePath(path.join(process.cwd(), 'src'))).toBe(path.join(process.cwd(), 'src'));
  });
  it('Debería retornar la ruta absoluta si es relativa', () => {
    expect(route.getAbsolutePath('src')).toBe(path.join(process.cwd(), 'src'));
  });
});

describe('is the path directory?', () => {
  it('Debería retornar function', () => {
    expect(typeof route.isDirectory).toBe('function');
  });
  it('Debería retornar true si la ruta absoluta es un directorio', () => {
    expect(route.isDirectory(path.join(process.cwd(), 'src'))).toBe(true);
  });
  it('Debería retornar false si la ruta absoluta no es un directorio', () => {
    expect(route.isDirectory(path.join(process.cwd(), 'src', 'main.js'))).toBe(false);
  });
});

describe('is the path file?', () => {
  it('Debería retornar function', () => {
    expect(typeof route.isFile).toBe('function');
  });
  it('Debería retornar false si la ruta absoluta no es un file', () => {
    expect(route.isFile(path.join(process.cwd(), 'src'))).toBe(false);
  });
  it('Debería retornar true si la ruta absoluta es un file', () => {
    expect(route.isFile(path.join(process.cwd(), 'src', 'main.js'))).toBe(true);
  });
});

describe('Is the extension of file .MD?', () => {
  it('Debería retornar function', () => {
    expect(typeof route.isMd).toBe('function');
  });
  it('Debería retornar false si el file no tiene extensión MD', () => {
    expect(route.isMd(path.join(process.cwd(), 'src'))).toBe(false);
  });
  it('Debería retornar true si el file tiene extensión MD', () => {
    expect(route.isMd(path.join(process.cwd(), 'README.md'))).toBe(true);
  });
});

describe('Find the MD file', () => {
  it('Debería retornar function', () => {
    expect(typeof route.searchMds).toBe('function');
  });
  it('Debería retornar el file con extensión MD', () => {
    expect(route.searchMds(path.join(process.cwd(), 'dir-test'))[0]).toBe(path.join(process.cwd(), 'dir-test', 'first.md'));
  });
  it('Debería retornar el file con extensión MD de un archivo dentro de otro archivo', () => {
    expect(route.searchMds(path.join(process.cwd(), 'dir-test'))[2]).toBe(path.join(process.cwd(), 'dir-test', 'subdir', 'third.md'));
  });
});

describe('Save links', () => {
  it('Debería retornar function', () => {
    expect(typeof route.saveLinksMds).toBe('function');
  });
  it('Debería retornar el link del primer elemento del array de links', () => {
    expect(route.saveLinksMds(path.join(process.cwd(), 'dir-test'))[0].href).toBe('https://es.wikipedia.org/wiki/Markdown');
  });
  it('Debería retornar el texto del primer elemento del array de links', () => {
    expect(route.saveLinksMds(path.join(process.cwd(), 'dir-test'))[0].text).toBe('1');
  });
  it('Debería retornar la ruta del primer elemento del array de links', () => {
    expect(route.saveLinksMds(path.join(process.cwd(), 'dir-test'))[0].path).toBe(path.join(process.cwd(), 'dir-test', 'first.md'));
  });
});
