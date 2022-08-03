const path = require('path');
const packageName = require(path.resolve('./package.json')).name

const config = {
    name: packageName,
    entry: {
        [packageName]: path.resolve(__dirname, './index.ts')
    },
    output: {
        path: path.resolve('./build/library'),
        filename: '[name].jslib',
        library: '[name]',
        clean: true,
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
        extensions: ['.ts', '.js'],
    },
    externals: {
    },
}

module.exports = [
    config
];