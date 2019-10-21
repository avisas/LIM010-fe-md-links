import {
  isDirectory, findAllMarkdownFiles, getAbsolutePath, isMdFile,
  directoryExists,
} from '../src/files-path.js';
import { pathsFromAllFiles, mdFiles } from './file-structure.js';

const mock = require('mock-fs');

const fileStructure = {
  'path/to/fake/dir': {
    'some-file.txt': 'file content here',
    'some-file.md': `'some content here with the link only for firebase 
    [Firestore](https://firebase.google.com/docs/firestore)'`,
    firstPathfile: {
      'some-file2.txt': 'file content here2',
      'some-file2.md': `'some other content with several links
      [medium](https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d)
      [markdown](https://joedicastro.com/pages/markdown.html/wrongurl)
      [RegExp](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp)'`,
      SecondPathFile: {
        'some-file3.txt': 'file content here3',
        'some-file3.md': `'some other content with several links 
        [medium](https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d)
        [markdown](https://joedicastro.com/pages/markdown.html)
        [RegExp](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp/wrongurl)'`,
      },
    },
  },
  'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
  'some/other/path': {/** another empty directory */ },
};

beforeEach(() => { mock(fileStructure); });
afterAll(() => { mock.restore(); });

describe('Convert relative path to absolute path', () => {
  it('debería convertir una ruta relativa a una ruta absoluta', () => {
    expect(getAbsolutePath('path/to/fake/dir')).toBe('C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir');
  });
  it('debería retornar la misma ruta si es absoluta', () => {
    expect(getAbsolutePath('C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir')).toBe('C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir');
  });
});

describe('Is it a markdown file?', () => {
  it('debería retornar true si es un archivo markdown', () => {
    expect(isMdFile('path/to/fake/dir/some-file.md')).toBe(true);
  });
  it('Debería retornar false si no es un archivo markdown', () => {
    expect(isMdFile('path/to/fake/dir/firstPathfile/some-file2.txt')).toBe(false);
  });
});

describe('Does the directory exists?', () => {
  it('debería retornar true si el directorio existe', () => {
    expect(directoryExists('path/to/fake/dir')).toBe(true);
  });

  it('debería retornar false si el directorio no existe', () => {
    expect(directoryExists('path/to/fake/dirfake')).toBe(false);
  });
});

describe('Is the path a directory  ?', () => {
  it('debería retornar true si la ruta absoluta es un directorio', () => {
    expect(isDirectory('C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile')).toBe(true);
  });
  it('Debería retornar false si la ruta absoluta no es un directorio', () => {
    expect(isDirectory('C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile\\some-file2.txt')).toBe(false);
  });
});

describe('Find all Markdown Files', () => {
  it('debería extraer en un array todos los archivos markdown', () => {
    expect(findAllMarkdownFiles(pathsFromAllFiles)).toStrictEqual(mdFiles);
  });
});

// describe('extract the Links from Markdown files', () => {
//   it('debería extraer todos los links de cada archivo markdown', () => {
//     expect(extractLinksFromMdFiles(mdFiles)).toStrictEqual(listOfURLs);
//   });
// });
