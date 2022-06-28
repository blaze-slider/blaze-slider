import typescript from 'rollup-plugin-ts'

export default {
  input: './useBlazeSlider.ts',
  plugins: [typescript()],
  external: ['react', 'blaze-slider'],
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
}
