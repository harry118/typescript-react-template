import * as fs from 'fs';
import * as path from 'path';

export const ROOT = fs.realpathSync(process.cwd());
const relativePath = (relativePath: string) => path.resolve(ROOT, relativePath);

export const appSrc = relativePath('src');
export const appBuild = relativePath('dist');
export const appPublic = relativePath('public');
export const appHtml = relativePath('public/index.html');
export const appTsconfig = relativePath('tsconfig.json');
export const appTslint = relativePath('tslint.json');
export const appNodeModules = relativePath('node_modules');

export const relativePathToAsset = (p: string) =>
  path.relative(p, `${ROOT}/src/assets`);
