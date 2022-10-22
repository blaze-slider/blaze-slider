import typescript from 'rollup-plugin-ts'
import pkg from './package.json'

export default {
  input: './useBlazeSlider.ts',
  plugins: [typescript()],
  external: ['react', 'blaze-slider'],
  output: {
    banner: `/* ${pkg.name} v${pkg.version} by ${pkg.author} */`,
    file: 'dist/index.js',
    format: 'esm',
  },
}
