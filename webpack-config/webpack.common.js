const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const globAll = require('glob-all')
const paths = require('./paths');

// src 절대경로
const srcPath = path.resolve(__dirname, '..', 'src')

module.exports = {
  entry: glob.sync(path.join(srcPath, 'scripts/*.js')).reduce((entries, entry) => {
    // /src/scripts 내부 js파일들을 대상으로 entry 객체 형성
    const entryName = path.basename(entry, '.js');
    entries[entryName] = entry;
    return entries;
  }, {}),
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: { version: 3, proposals: true },
                  useBuiltIns: 'usage',
                  shippedProposals: true,
                  targets: {
                    browsers: ['>= 1%, not dead'],
                  },
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|otf|svg)$/i,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    //  HTML 파일을 검색하고 자동으로 HtmlWebpackPlugin 설정을 생성합니다.
    ...glob.sync(path.join(srcPath, 'pages/*.html')).map((htmlFile) => {
      const filename = path.basename(htmlFile);
      const chunkName = path.basename(htmlFile, '.html');
      return new HtmlWebpackPlugin({
        template: htmlFile,
        filename,
        chunks: [chunkName],
      });
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: [".js",".json",".css",".scss",".sass"],
  },
};