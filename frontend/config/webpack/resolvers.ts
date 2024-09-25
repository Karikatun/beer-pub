import webpack from 'webpack';

import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import { BuildOptions } from './types/config';

export function webpackResolvers({ paths }: BuildOptions): webpack.ResolveOptions {
  return {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: paths.tsconfig })
    ]
  };
}
