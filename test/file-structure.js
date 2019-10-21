export const pathsFromAllFiles = [
  'path/to/fake/dir/firstPathfile',
  'path/to/fake/dir/some-file.md',
  'path/to/fake/dir/some-file.txt',
  'path/to/fake/dir/firstPathfile/some-file2.md',
  'path/to/fake/dir/firstPathfile/some-file2.txt',
  'path/to/fake/dir/firstPathfile/SecondPathFile',
  'path/to/fake/dir/firstPathfile/SecondPathFile/some-file3.md',
  'path/to/fake/dir/firstPathfile/SecondPathFile/some-file3.txt',
];

export const mdFiles = [
  'path/to/fake/dir/some-file.md',
  'path/to/fake/dir/firstPathfile/some-file2.md',
  'path/to/fake/dir/firstPathfile/SecondPathFile/some-file3.md',
];

export const listOfURLs = [
  {
    path: 'path/to/fake/dir',
    href: 'https://firebase.google.com/docs/firestore',
    text: 'Firestore',
  },
  {
    path: 'path/to/fake/dir/firstPathfile',
    href: 'https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d',
    text: 'medium',
  },
  {
    path: 'path/to/fake/dir/firstPathfile',
    href: 'https://joedicastro.com/pages/markdown.html/wrongurl',
    text: 'markdown',
  },
  {
    path: 'path/to/fake/dir/firstPathfile',
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp',
    text: 'RegExp',
  },
  {
    path: 'path/to/fake/dir/SecondPathfile',
    href: 'https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d',
    text: 'medium',
  },
  {
    path: 'path/to/fake/dir/SecondPathfile',
    href: 'https://joedicastro.com/pages/markdown.html',
    text: 'markdown',
  },
  {
    path: 'path/to/fake/dir/SecondPathfile',
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp/wrongurl',
    text: 'RegExp',
  },
];

export const listOfAbsPath = [
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir',
    href: 'https://firebase.google.com/docs/firestore',
    text: 'Firestore',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile',
    href: 'https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d',
    text: 'medium',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile',
    href: 'https://joedicastro.com/pages/markdown.html/wrongurl',
    text: 'markdown',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile',
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp',
    text: 'RegExp',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile\\SecondPathfile',
    href: 'https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d',
    text: 'medium',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile\\SecondPathfile',
    href: 'https://joedicastro.com/pages/markdown.html',
    text: 'markdown',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile\\SecondPathfile',
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp/wrongurl',
    text: 'RegExp',
  },
];

export const listOfURLFinalObj = [
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir',
    href: 'https://firebase.google.com/docs/firestore',
    text: 'Firestore',
    code: 'OK',
    codeStatus: '200',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile',
    href: 'https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d',
    text: 'medium',
    code: 'OK',
    codeStatus: '200',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile',
    href: 'https://joedicastro.com/pages/markdown.html/wrongurl',
    text: 'markdown',
    code: 'FAIL',
    codeStatus: '404',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile',
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp',
    text: 'RegExp',
    code: 'OK',
    codeStatus: '200',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile\\SecondPathfile',
    href: 'https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d',
    text: 'medium',
    code: 'OK',
    codeStatus: '200',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile\\SecondPathfile',
    href: 'https://joedicastro.com/pages/markdown.html',
    text: 'markdown',
    code: 'OK',
    codeStatus: '200',
  },
  {
    abspath: 'C:\\Users\\Alejandra\\Documents\\Laboratoria\\LIM010-fe-md-links-ale\\path\\to\\fake\\dir\\firstPathfile\\SecondPathfile',
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp/wrongurl',
    text: 'RegExp',
    code: 'FAIL',
    codeStatus: '404',
  },
];
