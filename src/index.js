import fs from 'fs';
import path from 'path';

import screenshot from './screenshot';

screenshot('https://robertoachar.dev')
  .then((data) => {
    const file = path.resolve(__dirname, 'screenshot.png');
    fs.writeFileSync(file, data, {
      encoding: 'utf-8',
    });
    console.log(file);
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
