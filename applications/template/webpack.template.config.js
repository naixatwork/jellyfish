const path = require('path');
const packageName = require('../../package.json').name;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    name: packageName,
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './template.html'),
            minify: "false"
        })],
    entry: {
        [packageName]: path.resolve(__dirname, './index.ts')
    },
    output: {
        path: path.resolve('./build/template'),
        filename: '[name].js',
        library: '[name]',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // instead of /\/node_modules\//
                    path.join(process.cwd(), 'node_modules')
                ]
            },
            {
                test: /fbapp-config.json/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.json/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules', path.resolve(__dirname, 'node_modules')]
    },
}

module.exports = [
    config
];