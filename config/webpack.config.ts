import webpack from 'webpack';
import path from 'path';
// plugins
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import WebpackBar from 'webpackbar';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import { appBuild, appHtml, appSrc, appTsconfig } from './path';
import genEnv, { Env } from './env';
import theme from './theme';

const { DefinePlugin, IgnorePlugin, ProgressPlugin } = webpack;

export default (env: Env): webpack.Configuration => {
  const envVar = genEnv(env);
  const { PUBLIC_URL } = envVar;
  const isDevelopment = envVar.NODE_ENV === 'development';
  // 处理环境变量
  const DefinedEnvs = Object.entries(envVar).reduce(
    (map, [key, value]) =>
      Object.assign(map, {
        [`process.env.${key}`]: JSON.stringify(value),
      }),
    {}
  );
  return {
    devtool: isDevelopment ? 'eval-source-map' : false,
    mode: isDevelopment ? 'development' : 'production',
    context: appSrc,
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    entry: {
      main: {
        import: ['./index.tsx'],
        dependOn: ['vendors'],
      },
      vendors: {
        import: ['react', 'react-dom'],
        runtime: 'runtime',
      },
    },
    performance: {
      hints: false,
    },
    output: {
      filename: 'static/js/[name].[fullhash].js',
      chunkFilename: 'static/js/[name].[fullhash].chunk.js',
      path: appBuild,
      publicPath: PUBLIC_URL,
    },
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
        // cacheGroups: {
        //   react: {
        //     name: 'react',
        //     test: /react/,
        //     priority: 1,
        //   },
        // },
      },
    },
    module: {
      generator: {},
      parser: {},
      defaultRules: [],
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset/resource',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // 4kb
            },
          },
          generator: {
            filename: 'static/assets/[hash][ext][query]',
          },
          include: appSrc,
          exclude: /node_modules/,
        },
        {
          test: /\.([tj]sx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                compact: true,
              },
            },
          ],
        },
        // less
        {
          test: /\.less$/,
          use: (isDevelopment
            ? [
                {
                  loader: 'style-loader',
                  options: {},
                },
              ]
            : [MiniCssExtractPlugin.loader as webpack.RuleSetUseItem]
          ).concat([
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                  modifyVars: theme,
                  javascriptEnabled: true,
                },
              },
            },
          ]),
        },
      ],
    },
    plugins: [
      // new LodashModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        ENABLE_APM: process.env.__ENABLE_APM__ === 'true',
        PUBLIC_URL,
        minify: isDevelopment
          ? {}
          : {
              collapseWhitespace: true,
              keepClosingSlash: true,
              minifyCSS: true,
              minifyJS: true,
              minifyURLs: true,
              removeEmptyAttributes: true,
              removeRedundantAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            },
        template: appHtml,
      }),
      new DefinePlugin(DefinedEnvs),
      new IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new WebpackBar(),
    ],
    resolve: {
      extensions: [
        '.mjs',
        '.web.ts',
        '.ts',
        '.web.tsx',
        '.tsx',
        '.web.js',
        '.js',
        '.json',
        '.web.jsx',
        '.jsx',
      ],
      modules: ['node_modules', appSrc],
      // 用于匹配 typescript中 引入相对路径,例如"import util from '@util/index'"
      plugins: [new TsconfigPathsPlugin({ configFile: appTsconfig })],
      symlinks: false,
    },
  };
};
