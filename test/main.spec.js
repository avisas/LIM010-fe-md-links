const mock = require('mock-fs');

const fileStructure = {
    'path/to/fake/dir': {
      'some-file.txt': 'file content here',
      'some-file.md': 'some content here with the link only for firebase [Firestore](https://firebase.google.com/docs/firestore) ',
      fakedir2: {
        'some-file2.txt': 'file content here2',
        'some-file2.md': 'some other content with several links [mobile](https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png)[desktop](https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png)[_mobile first_](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)',
        fakedir3: {
          'some-file3.txt': 'file content here3',
          'some-file3.md': 'some other content with several links [mobile](https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png)[desktop](https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png)[_mobile first_](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/no)',
        },
      },
    },
    'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
    'some/other/path': {/** another empty directory */},
  };
  
  beforeEach(() => { mock(fileStructure); });
  afterAll(() => { mock.restore(); });