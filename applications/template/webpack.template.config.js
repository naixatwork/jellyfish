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
        extensions: ['.ts'],
    },
}

module.exports = [
    config
];