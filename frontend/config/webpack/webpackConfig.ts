import webpack from 'webpack';

import { BuildOptions } from './types/config';

import { webpackDevServer } from './devServer';
import { webpackLoadres } from './loaders';
import { webpackPlugins } from './plugins';
import { webpackResolvers } from './resolvers';

export function webpackConfig(options: BuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true
    },
    plugins: webpackPlugins(options),
    module: { rules: webpackLoadres(options) },
    resolve: webpackResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? webpackDevServer(options) : undefined
  };
}
