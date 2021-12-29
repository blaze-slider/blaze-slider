import fs from 'fs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-ts'
import pkg from './package.json'

const minifier = terser({ compress: true })

const outputs = [
  // esm
  {
    file: 'dist/blaze-slider.esm.js',
    format: 'esm'
  },
  // cjs.dev
  {
    file: 'dist/blaze-slider.cjs.dev.js',
    format: 'cjs'
  },
  // cjs.prod
  {
    file: 'dist/blaze-slider.cjs.prod.js',
    format: 'cjs',
    plugins: [minifier]
  },
  // umd
  {
    file: 'dist/blaze-slider.umd.js',
    name: pkg.name,
    format: 'umd'
  }
]

export default args => {
  createCjsFile()
  return {
    input: './src/index.ts',
    output: args.dev ? outputs[0] : outputs,
    plugins: [typescript()]
  }
}

const createCjsFile = () => {
  const code = `\
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./blaze-slider.cjs.dev.js');
} else {
  module.exports = require('./blaze-slider.cjs.prod.js');
};`

  fs.mkdirSync('./dist', { recursive: true })

  fs.writeFile('./dist/blaze-slider.cjs.js', code, err => {
    if (err) console.error(err)
  })
}
