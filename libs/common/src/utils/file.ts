import { PathLike, createReadStream, rmSync } from 'fs';
import { parse } from 'csv-parse';

export function readLinesFromFile(filePath: PathLike): Promise<string[]> {
  return new Promise((resolve, reject) => {
    createReadStream(filePath, { encoding: 'utf8' });

    const parser = parse({ delimiter: ',' }, function (err, data) {
      rmSync(filePath);
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
    createReadStream(filePath).pipe(parser);
  });
}
