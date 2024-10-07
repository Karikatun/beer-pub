import path from 'path';
import webpack from 'webpack';

import { webpackConfig } from './config/webpack/webpackConfig';
import { BuildPaths, BuildEnv } from './config/webpack/types/config';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  }
  
  const PORT = 3000;

  const config: webpack.Configuration = webpackConfig({
    mode: env.mode,
    paths,
    isDev: env.mode === 'development',
    port: env.port,
    analyze: env.analyze,
  })

  return config
};
