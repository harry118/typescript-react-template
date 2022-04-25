import { appBuild } from './path';
import genEnv, { Env } from './env';
import wds from 'webpack-dev-server';

// default local env
const { PUBLIC_URL, PORT } = genEnv('local');

export default {
  allowedHosts: 'all',
  client: { logging: 'error', progress: true, overlay: true },
  // contentBase: appBuild,
  historyApiFallback: true,
  port: Number(PORT),
  hot: true,
  static: {
    publicPath: PUBLIC_URL,
  },
  https: false,
  setupExitSignals: true,
} as wds.Configuration;
