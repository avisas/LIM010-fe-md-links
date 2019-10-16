import {
  validateDirectory, getFilePaths, findAllMarkdownFiles, getAbsolutePath, isFile, isMd,
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
      [markdown](https://joedicastro.com/pages/markdown.html)
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
    expect(getAbsolutePath('path/to/fake/dir')).toBe('path/to/fake/dir');
  });
  it('debería retornar la misma ruta si es absoluta', () => {
    expect(getAbsolutePath('path/to/fake/dir')).toBe('path/to/fake/dir');
  });
});

describe('Is it a File?', () => {
  it('debería retornar true si es un archivo', () => {
    expect(isFile('path/to/fake/dir')).toBe(true);
  });
  it('debería retornar la misma ruta si es absoluta', () => {
    expect(isFile('path/to/fake/dir')).toBe(false);
  });
});

describe('Is it a markdown file?', () => {
  it('Debería retornar true si la extensión del archivo es .md', () => {
    expect(isMd('path/to/fake/dir/some-file.md')).toBe(true);
  });
  it('Debería retornar false si la extensión del archivo no es .md', () => {
    expect(isMd('path/to/fake/dir/firstPathfile/some-file2.txt')).toBe(false);
  });
});

describe('validate directory', () => {
  it('debería retornar true si el directorio existe', () => {
    expect(validateDirectory('path/to/fake/dir')).toBe(true);
  });

  it('debería retornar false si el directorio no existe', () => {
    expect(validateDirectory('path/to/fake/dirfake')).toBe(false);
  });
});

describe('getFilePaths', () => {
  it('debería obtener recursivamente en un array las rutas de todos los archivos', () => {
    expect(getFilePaths('path/to/fake/dir')).toStrictEqual(pathsFromAllFiles);
  });
});

describe('Find all Markdown Files', () => {
  it('debería extraer en un array todos los archivos markdown de cada directorio', () => {
    expect(findAllMarkdownFiles(pathsFromAllFiles)).toStrictEqual(mdFiles);
  });
});

// describe('allMarkdownLinks', () => {
//   it('debería extraer todos los links de cada archivo markdown', () => {
//     expect().toBe();
//   });
// });

// describe('validateURL', () => {
//   it('debería validar todos los links de cada URL', (done) => {
//     validateURL()
//       .then((data) => {
//         expect(data).toStrictEqual();
//         done();
//       });
//   });
// });
