import fs from 'fs'
import banner from 'rollup-plugin-banner'
import { eslintBundle } from 'rollup-plugin-eslint-bundle'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-ts'
import pkg from './package.json'

const minifier = terser({ compress: true })

const eslintPlugin = eslintBundle({
  eslintOptions: {
    fix: true,
  },
  throwOnWarning: true,
  throwOnError: true,
  formatter: 'compact',
})

const bannerPlugin = banner(
  'blaze-slider v<%= pkg.version %> by <%= pkg.author %>'
)

const outputs = [
  // esm
  {
    file: 'dist/blaze-slider.esm.js',
    format: 'esm',
    throwOnWarning: true,
    plugins: [eslintPlugin, bannerPlugin],
  },
  // cjs.dev
  {
    file: 'dist/blaze-slider.cjs.dev.js',
    format: 'cjs',
    plugins: [eslintPlugin, bannerPlugin],
  },
  // cjs.prod
  {
    file: 'dist/blaze-slider.cjs.prod.js',
    format: 'cjs',
    plugins: [minifier, bannerPlugin],
  },
  // umd
  {
    file: 'dist/blaze-slider.umd.js',
    name: pkg.name,
    format: 'umd',
    plugins: [minifier, bannerPlugin],
  },
]

export default (args) => {
  createCjsFile()
  return {
    input: './src/index.ts',
    output: args.dev ? outputs[0] : outputs,
    plugins: [typescript()],
  }
}

const createCjsFile = () => {
  const code = `\
// blaze-slider v${pkg.version} by ${pkg.author}

if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./blaze-slider.cjs.dev.js');
} else {
  module.exports = require('./blaze-slider.cjs.prod.js');
};`

  fs.mkdirSync('./dist', { recursive: true })

  fs.writeFile('./dist/blaze-slider.cjs.js', code, (err) => {
    if (err) console.error(err)
  })
}
