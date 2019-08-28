import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-css-porter';

const config = {
    input: 'src/components/Datepicker/index.js',
    external: ['react'],
    output: {
        format: 'umd',
        name: 'datepicker',
        globals: {
            react: "React"
        }
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        css()
    ]
}
export default config