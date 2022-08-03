const path = require('path');
const packageName = require('./package.json').name

const baseConfig = {
    name: packageName,
    entry: {
        [packageName]: './src/index.ts'
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
        // jquery: 'jQuery',
    },
}

const mainConfig = Object.assign({}, baseConfig, {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        library: '[name]',
    }
})

const libraryConfig = Object.assign({}, baseConfig, {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].jslib',
        library: '[name]',
    }
})



module.exports = [
    mainConfig, libraryConfig
];