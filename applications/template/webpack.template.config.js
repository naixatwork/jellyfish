const path = require('path');
const packageName = require('../../package.json').name

const config = {
    name: packageName,
    entry: {
        [packageName]: path.resolve(__dirname, './index.html')
    },
    output: {
        path: path.resolve('./build/template'),
        filename: 'index.html',
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', 'json'],
    },
    externals: {
    },
}

module.exports = [
    config
];