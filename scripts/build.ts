process.env.NODE_ENV = 'production';

import chalk from 'chalk';
import cp from 'child_process';
import fs from 'fs-extra';
import rimraf from 'rimraf';
import SpeedMeasureWebpackPlugin from 'speed-measure-webpack-plugin';
import webpack from 'webpack';
import { ENV, Env } from '../config/env';
import { BUILD_PATH, PUBLIC_FOLDER, ROOT, TEMPLATE_FILE } from '../config/path';
import config from '../config/webpack.config';

const { execSync } = cp;
const envLog = (str: string) => console.log(chalk.yellow.bold(str));
const smp = new SpeedMeasureWebpackPlugin();
const withSMPConfig = (configuration: webpack.Configuration) =>
  Boolean(process.env.SMP_ENABLE) ? smp.wrap(configuration) : configuration;

envLog('\nWebpack is building...\n');
envLog(`${execSync('git --version')}`.replace('\n', ''));
envLog(`Work directory: ${process.cwd()}`);
envLog(`NPM: ${execSync('npm -v')}`.replace('\n', ''));
envLog(`Node: ${process.version}`);
envLog(`ENV: ${process.env.ENV}`);
envLog(`NODE_ENV: ${process.env.NODE_ENV}`);
const runBuild = (env: Env) =>
  new Promise<any>((resolve, reject) => {
    const conf = config(env);
    const compiler = webpack(withSMPConfig(conf));
    try {
      compiler.run((err, stats) => {
        if (err) {
          reject(err.stack || err);
        }
        resolve(stats);
      });
    } catch (e) {
      reject(e);
    }
  });

rimraf(`${BUILD_PATH}/*`, async () => {
  const start = Date.now();
  const envs = ENV.slice();
  const total = envs.length;
  let env = envs.shift();

  while (env) {
    envLog(`\nBuild ${env}\n`);
    await runBuild(env)
      .then((stats) => {
        const info = stats.toJson();
        if (stats.hasErrors()) {
          console.warn(info.errors);
        }
        console.log(
          stats.toString({
            assets: true,
            builtAt: true,
            colors: true,
            entrypoints: false,
            errors: false,
            hash: false,
            modules: false,
            performance: false,
          })
        );
      })
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });

    // copy public files
    fs.copySync(PUBLIC_FOLDER, `${BUILD_PATH}`, {
      dereference: true,
      filter: (file) => ![TEMPLATE_FILE].includes(file),
    });
    env = envs.shift();
  }

  const spend = (Date.now() - start) / 1000;
  envLog(`\nBuild done\n`);
  envLog(`Total build time: ${spend} seconds.`);
  envLog(`Average build time: ${spend / total} seconds.`);
});
