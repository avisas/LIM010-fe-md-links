const path = require('path');
const fs = require('fs');

export const directoryExists = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const getAbsolutePath = (thePath) => ((path.isAbsolute(thePath)) ? thePath : path.resolve(thePath));

export const isMdFile = (thePath) => {
  if (fs.statSync(thePath).isFile()) {
    if (path.extname(thePath) === '.md') {
      return true;
    };
  };
  return false;
};

export const isDirectory = (thePath) => fs.statSync(thePath).isDirectory();

export const findAllMarkdownFiles = (filePathList) => {
  const markdownFiles = [];
  filePathList.forEach((file) => {
    if (path.extname(file).toLowerCase() === '.md' || path.extname(file).toLowerCase() === '.markdown') {
      markdownFiles.push(file);
    }
  });
  return markdownFiles;
};

// export const extractLinksFromMdFiles = (paths) => {
//   let linksOfMdFiles = [];
//   if (isDirectory(paths)) {
//     const allFilesPaths = getFilePaths(paths); // corregir función
//     const markdownFiles = findAllMarkdownFiles(allFilesPaths);
//     markdownFiles.forEach((aPath) => {
//       const file = fs.readFileSync(aPath);
//       render.link = (hrefFile, titleFile, textFile) => {
//         arrayofLinks.push({
//           href: hrefFile,
//           text: textFile.substring(0, 50),
//           path: aPath,
//         });
//       };
//       marked(file.toString(), {
//         renderer = render,
//       });
//     });
//     linksOfMdFiles = extractLinks(markdownFiles); // falta crear función
//   } else {
//     linksOfMdFiles = 'No existe el directorio especificado';
//   }
//   return linksOfMdFiles;
// };
