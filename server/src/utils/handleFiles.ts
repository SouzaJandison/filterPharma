import { readFile, writeFile } from 'fs';
import * as path from 'path';
import { promisify } from 'util' ;

const readFileAsync = promisify(readFile);

class HandleFiles {
  async readFile() {
    const data = await readFileAsync(
      path.join(__dirname, '..', 'database', 'dataFake', 'database.json' ), 'utf8'
    );
    
    return JSON.parse(data.toString());
  };
};

export default new HandleFiles();