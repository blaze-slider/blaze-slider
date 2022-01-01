import banner from 'rollup-plugin-banner'
import { eslintBundle } from 'rollup-plugin-eslint-bundle'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-ts'

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
  // Modern ESM
  {
    file: 'dist/blaze-slider.esm.js',
    format: 'esm',
    plugins: [eslintPlugin, bannerPlugin],
  },
  // CJS Dev
  {
    file: 'dist/blaze-slider.cjs.dev.js',
    format: 'cjs',
    plugins: [eslintPlugin, bannerPlugin],
  },
  // CJS PROD
  {
    file: 'dist/blaze-slider.cjs.prod.js',
    format: 'cjs',
    plugins: [minifier, bannerPlugin],
  },
  // IIFE
  {
    file: 'dist/blaze-slider.min.js',
    name: 'BlazeSlider',
    format: 'iife',
    plugins: [minifier, bannerPlugin],
  },
]

export default (args) => {
  return {
    input: './src/index.ts',
    output: args.dev ? outputs[0] : outputs,
    plugins: [typescript()],
  }
}
