import * as fs from "fs";
import * as path from "path";

export const ROOT = fs.realpathSync(process.cwd());
const relativePath = (relativePath: string) => path.resolve(ROOT, relativePath);

export const APP_PATH = relativePath("src");
export const BUILD_PATH = relativePath("dist");
export const PUBLIC_FOLDER = relativePath("public");
export const TEMPLATE_FILE = relativePath("public/index.html");
export const TS_CONFIG = relativePath("tsconfig.json");
export const TS_LINT_CONFIG = relativePath("tslint.json");

export const relativePathToAsset = (p: string) =>
  path.relative(p, `${ROOT}/src/assets`);
