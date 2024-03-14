// @ts-check

import terser from '@rollup/plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import packageJSON from './package.json' assert { type: 'json' };
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import builtins from 'rollup-plugin-node-builtins';
import autoExternal from 'rollup-plugin-auto-external';
import internal from 'rollup-plugin-internal';

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${packageJSON.name} v${packageJSON.version}
 * (c) ${packageJSON.author.name}
 * Released under the ${packageJSON.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    name: 'radiobridgeDecoder',
    exports: 'named',
    sourcemap: true,
    ...options,
  };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: './src/index.ts',
  output: [
    createOutputOptions({
      file: './dist/index.js',
      format: 'commonjs',
    }),
    createOutputOptions({
      file: './dist/index.cjs',
      format: 'commonjs',
    }),
    createOutputOptions({
      file: './dist/index.mjs',
      format: 'esm',
    }),
    createOutputOptions({
      file: './dist/index.esm.js',
      format: 'esm',
    }),
    createOutputOptions({
      file: './dist/index.umd.js',
      format: 'umd',
    }),
    createOutputOptions({
      file: './dist/index.umd.min.js',
      format: 'umd',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.iife.min.js',
      format: 'iife',
      name: "radiobridgeDecoder",
      esModule: false,
      exports: "named",
      sourcemap: true,
      plugins: [

        resolve({
          browser: true,
          preferBuiltins: false,
          jsnext: true,
          main: true,
          moduleDirectories: ['node_modules']
        }),
        commonjs({
          include: 'node_modules/**',
          ignoreGlobal: false,
          sourceMap: false,
        }),
        autoExternal(),
        globals(),
        babel({
          babelHelpers: "bundled",
        }),
        builtins(),
        // internal(['locutus', 'locutus/php', 'buffer']),
        terser(),
      ],
    }),
  ],
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
};

export default options;
