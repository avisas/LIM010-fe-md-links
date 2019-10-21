// const fs = require('fs');
// const path = require('path');

// const isMdFile = (thePath) => {
//   if (fs.statSync(thePath).isFile()) {
//     if (path.extname(thePath) === '.md') {
//       return true;
//     }
//   }
//   return false;
// };

// const isDirectory = (thePath) => fs.statSync(thePath).isDirectory();

// const getAbsolutePath = (thePath) => {
// ((path.isAbsolute(thePath)) ? thePath : path.resolve(thePath));
// };
// console.log(getAbsolutePath('path/to/fake/dir/firstPathfile'));

// const rootPath = 'C:\\Users\\Alejandra\\Downloads';

// console.log(rootPath);

// fs.readdir(rootPath, function (err, items) {
//   console.log(items);
//   for (let i = 0; i < items.length; i++) {
//     console.log(`item: ${items[i]}, isdirectory: ${isDirectory(path.join(rootPath, items[i]))},
//  ismdFile: ${isMdFile(path.join(rootPath, items[i]))}`);
//   }
// });
