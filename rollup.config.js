import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import clean from 'rollup-plugin-clean';
import html from '@web/rollup-plugin-html';

export default {
    input: 'index.html',
    output: {
        dir: 'dist',
        sourcemap: true,
    },
    plugins: [
        clean(),
        html(),
        nodeResolve(),
        sourcemaps(),
    ],
};
