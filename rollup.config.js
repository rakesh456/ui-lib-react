import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-css-porter';

const config = {
    input: 'src/App.js',
    external: ['react'],
    output: {
        format: 'es',
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