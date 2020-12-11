/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
import opts from 'opts';
import exec from './index';
import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';

opts.parse(
  [
    {
      short: 's',
      long: 'source',
      required: true,
      value: true,
      description: 'Target source files path. ( glob pattern )'
    },
    {
      short: 'd',
      long: 'dist',
      required: true,
      value: true,
      description: 'Dist dirctory path.'
    },
    {
      short: 'e',
      long: 'ext',
      required: false,
      value: true,
      description: 'Extension of output file.'
    }
  ],
  true
);

const source = String(opts.get('source'));
const dist = String(opts.get('dist'));
const ext = String(opts.get('ext') || 'mongoose.ts');

fs.emptyDirSync(dist);

const matches: string[] = glob.sync(source);
matches.forEach((file: string) => {
  const schema = exec({ file });
  fs.writeFileSync(
    path.join(dist, `${path.basename(file, '.ts')}.${ext}`),
    schema || '',
    'utf-8'
  );
});
