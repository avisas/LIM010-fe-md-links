const path = require('path');
const fs = require('fs');

const validateDirectory = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

const getAbsolutePath = (thePath) => ((path.isAbsolute(thePath)) ? thePath : path.resolve(thePath);

const isFile = (thePath) => fs.statSync(thePath).isFile();
exports.isFile = isFile;

const isMd = (file) => path.extname(file) === '.md'; // return a extension as a string.
exports.isMd = isMd;

const getFilePaths = (dir) => {
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

const findAllMarkdownFiles = (filePathList) => {
  const markdownFiles = [];
  filePathList.forEach((file) => {
    if (path.extname(file).toLowerCase() === '.md' || path.extname(file).toLowerCase() === '.markdown') {
      markdownFiles.push(file);
    }
  });
  return markdownFiles;
};

export {
  validateDirectory, getAbsolutePath, isFile, isMd, getFilePaths, findAllMarkdownFiles,
};