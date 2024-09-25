export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  tsconfig: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  analyze?: boolean;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  analyze?: boolean;
}
