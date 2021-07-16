import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: ['./src/index.tsx'],
  output: [
    {
      dir: 'dist/lib',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'dist/es',
      format: 'esm',
      sourcemap: true,
    },
    {
      dir: 'example/src/component/VideoPlayer',
      format: 'es',
      banner: '/* eslint-disable */',
    },
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    postcss(),
    commonjs(),
  ],
  external: {
    react: '^16.14.0',
    'react-dom': '^16.14.0',
  },
};
