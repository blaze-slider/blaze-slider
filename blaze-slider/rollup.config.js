import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-ts'

const banner = `/* blaze-slider v1.9.3 by Manan Tank */`

// use this tsconfig to prevent declaration files from being emitted
// don't emit declaration files for each build - emit just one time when building the ESM bundle
// so that we don't have the same file 5 times in the dist folder
const tsNoTypeEmit = typescript({
  tsconfig: 'tsconfig.nodecl.json',
})

const input = './src/index.ts'

/**
 * CJS bundles are for older bundlers that can not handle CJS modules
 * ESM bundle is for modern bundlers that can handle ES modules
 * modern bundler will choose ESM because we have specified it in pkg.module
 * IIFE bundles can be used directly on browser without any bundlers
 */

const devBuilds = {
  input: input,
  output: [
    // CJS Dev
    {
      file: 'dist/blaze-slider.cjs.dev.js',
      format: 'cjs',
      exports: 'default',
      banner,
    },
    // IIFE dev
    {
      file: 'dist/blaze-slider.dev.js',
      name: 'BlazeSlider',
      format: 'iife',
      banner,
    },
  ],
  plugins: [
    tsNoTypeEmit,
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': '"development"',
    }),
  ],
}

const prodBuilds = {
  input: input,
  output: [
    // IIFE prod
    {
      file: 'dist/blaze-slider.min.js',
      name: 'BlazeSlider',
      format: 'iife',
    },
    // CJS PROD
    {
      file: 'dist/blaze-slider.cjs.prod.js',
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [
    tsNoTypeEmit,
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': '"production"',
    }),
    terser({ compress: true }),
  ],
}

const esmBuild = {
  input: input,
  plugins: [typescript()],
  output: {
    file: 'dist/blaze-slider.esm.js',
    format: 'esm',
    banner,
  },
}

export default [devBuilds, prodBuilds, esmBuild]
