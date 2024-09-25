import { BuildOptions } from './types/config';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export function webpackDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port,
    open: false,
    historyApiFallback: true,
    hot: true
  };
}
