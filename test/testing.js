var fs = require('fs');
var path = require('path');

const isMdFile = (thePath) => {
    if (fs.statSync(thePath).isFile()) {
        if (path.extname(thePath) === '.md') {
            return true;
        };
    };
    return false;
};

const isDirectory = (thePath) => fs.statSync(thePath).isDirectory();

const getAbsolutePath = (thePath) => ((path.isAbsolute(thePath)) ? thePath : path.resolve(thePath));

const rootPath = 'C:\\Users\\Alejandra\\Downloads';

console.log(rootPath);

fs.readdir(rootPath, function (err, items) {
    console.log(items);
    for (var i = 0; i < items.length; i++) {
        console.log(`item: ${items[i]}, abspath: ${getAbsolutePath(items[i])}, isdirectory: ${isDirectory(items[i])}, ismdFile: ${isMdFile(items[i])}`);
        //console.log(`${items[i]} `);
    }
});


