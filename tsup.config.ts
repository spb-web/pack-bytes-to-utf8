import { defineConfig } from 'tsup'

export default defineConfig([
  {
    name: 'pack-bytes-to-utf8',
    entry: ['src'],
    sourcemap: true,
    clean: true,
    minify: false,
    outDir: './dist/esm',
    format: 'esm',
    platform: 'browser',
    treeshake: true,
    bundle: true,
  }, {
    name: 'pack-bytes-to-utf8',
    entry: ['src'],
    sourcemap: true,
    clean: true,
    minify: false,
    outDir: './dist/cjs',
    format: 'cjs',
    platform: 'browser',
    treeshake: true,
    bundle: false,
  },
  {
    name: 'pack-bytes-to-utf8',
    entry: ['src'],
    sourcemap: true,
    clean: true,
    minify: false,
    outDir: './dist/types',
    format: [],
    dts: true,
    bundle: false,
  },
])
