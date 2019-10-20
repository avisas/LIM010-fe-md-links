const path = require('path');
const fs = require('fs');

const directoryExists = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

const getAbsolutePath = (thePath) => ((path.isAbsolute(thePath)) ? thePath : path.resolve(thePath));

const isMdFile = (thePath) => {
  if (fs.statSync(thePath).isFile()) {
    if (path.extname(thePath) === '.md') {
      return true;
    };
  };
  return false;
};

const isDirectory = (thePath) => fs.statSync(thePath).isDirectory();

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

const extractLinksFromMdFiles = (paths) => {
  let linksOfMdFiles = [];
  const render = new marked.Renderer();
  if (isDirectory(paths)) {
    const allFilesPaths = getFilePaths(paths); //corregir función
    const markdownFiles = findAllMarkdownFiles(allFilesPaths);
    markdownFiles.forEach((aPath) => {
      const file = fs.readFileSync(aPath);
      render.link = (hrefFile, titleFile, textFile) => {
        arrayofLinks.push({
          href: hrefFile,
          text: textFile.substring(0, 50),
          path: aPath,
        });
      };
      marked(file.toString(), {
        renderer = render,
      });
    });
    linksOfMdFiles = extractLinks(markdownFiles); // falta crear función
  } else {
    linksOfMdFiles = 'No existe el directorio especificado';
  }
  return linksOfMdFiles;
};


export {
  directoryExists, getAbsolutePath, isDirectory, isMdFile, getFilePaths, findAllMarkdownFiles, extractLinksFromMdFiles,
};
