const path = require('path')
const config = require('./index')
const profile = process.env.NODE_ENV === 'production' ? config.build : config.dev

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: ['react', 'react-dom', 'react-router', 'redux', 'antd']  //第三方库和框架
    },
    output: {
        path: profile.buildPath,
        filename: path.posix.join(profile.jsDirectory, '[name].[hash:8].js'),
        chunkFilename: path.posix.join(profile.jsDirectory, '[name].[chunkhash:8].js'),
        publicPath: profile.publicPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: [{ loader: 'babel-loader' }]
            }, {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: path.posix.join(profile.imageDirectory, '[name].[hash:8].[ext]')
                    }
                },
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: path.posix.join(profile.fontDirectory, '[name].[hash:8].[ext]')
                    }
                }
            }
        ]
    }
}