import * as cp from 'child_process';
import open from 'open';
import webpack from 'webpack';
import wds from 'webpack-dev-server';
import chalk from 'chalk';

import genEnv from './../config/env';
import webpackConfig from '../config/webpack.config';
import webpackDevServerConfig from '../config/webpackDevServerConfig';

// default local env
const { HOST, PORT } = genEnv('local');

const compiler = webpack(webpackConfig('local') as any) as any;
const server = new wds(webpackDevServerConfig, compiler);
const envLog = (str: string) => console.log(chalk.yellow.bold(str));

// run webpack-dev-server
server.start().then(
  async (val) => {
    envLog(`Node: ${process.version}`);
    envLog(`ENV: ${process.env.ENV}`);
    envLog(`NODE_ENV: ${process.env.NODE_ENV}`);
    const url = `http://localhost:${Number(PORT)}${
      process.env.PUBLIC_URL || ''
    }`;
    try {
      await open(url, {
        app: { name: open.apps.chrome },
      });
    } catch (err) {
      console.warn(`Open broswer failed, please open ${url} by your self.`);
    }
  },
  (err) => {
    console.error(err);
  }
);
