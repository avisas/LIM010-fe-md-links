const path = require('path');
const fs = require('fs');

export const validateDirectory = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const getFilePaths = (dir) => {
  let fileList = [];
  let dirfilelist = [];
  let fileslist = [];
  fs.readdirSync(dir).forEach((file) => {
    fileslist = fs.statSync(dir).isFile()
      ? getFilePaths(path.join(dir, file))
      : fileslist.concat(path.join(dir, file));
    dirfilelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? getFilePaths(path.join(dir, file))
      : dirfilelist.concat(path.join(dir, file));
    fileList = fileslist.concat(dirfilelist);
  });
  return new Set(fileList);
};

export const readAllMarkdownFiles = (filePathList) => {
  const markdownFiles = [];
  filePathList.forEach((file) => {
    if (path.extname(file).toLowerCase() === '.md' || path.extname(file).toLowerCase() === '.markdown') {
      markdownFiles.push(file);
    }
  });
  return markdownFiles;
};

export const extractLinksFromMdFiles = (paths) => {
  let linksOfMdFiles = [];
  if (validateDirectory(paths)) {
    const allFilesPaths = getFilePaths(paths);
    const markdownFiles = readAllMarkdownFiles(allFilesPaths);
    linksOfMdFiles = extractLinks(markdownFiles); // falta crear función
  } else {
    linksOfMdFiles = 'No existe el directorio especificado';
  }
  return linksOfMdFiles;
};
