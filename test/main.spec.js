import { listOfURLFinalObj, listOfAbsPath, mdFiles } from './file-structure.js';
import { main, updateListOfMarkdownFiles, getListOfURLProperties } from '../src/main.js';

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

describe('main function', () => {
  it('debería mostrar en consola', () => {
    expect(main()).toStrictEqual();
  });
});

describe('update list of markdown files', () => {
  it('debería obtener un array de archivos .md con rutas absolutas de cada elemento', () => {
    expect(updateListOfMarkdownFiles(mdFiles, 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile\\some-file2.md')).toStrictEqual(listOfAbsPath);
  });
});

describe('get the list of URL properties', () => {
  it('debería obtener un array con la lista de links de archivos .md y sus propiedades', () => {
    expect(getListOfURLProperties(mdFiles)).toStrictEqual(listOfURLFinalObj);
  });
});
