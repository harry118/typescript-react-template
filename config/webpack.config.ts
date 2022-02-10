import webpack from "webpack";
import path from "path";
// plugins
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";

import { BUILD_PATH, TEMPLATE_FILE, APP_PATH, TS_CONFIG } from "./path";
import genEnv, { Env } from "./env";

const { DefinePlugin, IgnorePlugin } = webpack;

export default (env: Env): any => {
  const envVar = genEnv(env);
  const { PUBLIC_URL } = envVar;
  const isDevelopment = envVar.NODE_ENV === "development";
  // 处理环境变量
  const DefinedEnvs = Object.entries(envVar).reduce(
    (map, [key, value]) =>
      Object.assign(map, {
        [`process.env.${key}`]: JSON.stringify(value),
      }),
    {}
  );
  return {
    devtool: isDevelopment ? "eval-source-map" : false,
    mode: isDevelopment ? "development" : "production",
    context: path.resolve(__dirname, "../src"),
    entry: {
      main: {
        import: ["./index.tsx"],
        dependOn: ["vendors"],
      },
      vendors: {
        import: ["react", "react-dom"],
        runtime: "runtime",
      },
    },
    output: {
      filename: "static/js/[name].[fullhash].js",
      chunkFilename: "static/js/[name].[fullhash].chunk.js",
      path: `${BUILD_PATH}`,
      publicPath: PUBLIC_URL,
    },
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    module: {
      generator: {},
      parser: {},
      defaultRules: [],
      rules: [
        {
          oneOf: [
            {
              include: APP_PATH,
              loader: "url-loader",
              options: {
                limit: -1,
                name: `static/media/[name].[hash:8].[ext]`,
              },
              test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
            },
            {
              exclude: /node_modules/,
              test: /\.([tj]sx?)$/,
              use: [
                {
                  loader: "babel-loader",
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
                      loader: "style-loader",
                      options: {},
                    },
                  ]
                : [
                    MiniCssExtractPlugin.loader,
                    "cache-loader" as webpack.RuleSetUseItem,
                  ]
              ).concat([
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: "less-loader",
                  options: {
                    lessOptions: {
                      // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                      // modifyVars: theme,
                      javascriptEnabled: true,
                    },
                  },
                },
              ]),
            },
            {
              exclude: [/\.(js|ts|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: "file-loader",
              options: {
                name: `static/media/[name].[ext]`,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        ENABLE_APM: process.env.__ENABLE_APM__ === "true",
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
        template: TEMPLATE_FILE,
      }),
      new DefinePlugin(DefinedEnvs),
      new IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new ProgressBarPlugin(),
    ],
    resolve: {
      extensions: [
        ".mjs",
        ".web.ts",
        ".ts",
        ".web.tsx",
        ".tsx",
        ".web.js",
        ".js",
        ".json",
        ".web.jsx",
        ".jsx",
      ],
      modules: ["node_modules", APP_PATH],
      // 用于匹配 typescript中 引入相对路径,例如"import util from '@util/index'"
      plugins: [new TsconfigPathsPlugin({ configFile: TS_CONFIG })],
      symlinks: false,
    },
  };
};
