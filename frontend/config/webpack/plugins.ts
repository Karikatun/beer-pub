import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { BuildOptions } from './types/config';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

export function webpackPlugins({ paths, isDev, analyze }: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HtmlWebpackPlugin({ template: paths.html }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new BundleAnalyzerPlugin({ analyzerMode: analyze ? 'server' : 'disabled' }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({ __IS_DEV__: JSON.stringify(isDev) })
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return plugins;
}
