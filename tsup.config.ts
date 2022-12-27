import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'pack-bytes-to-utf8',
  entry: ['src'],
  sourcemap: true,
  clean: true,
  minify: false,
  outDir: './dist',
  format: ['esm', 'cjs'],
  platform: 'browser',
  treeshake: true,
  bundle: true,
  dts: true,
})
