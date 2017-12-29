const path = require('path')
const config = require('./index')
const webpack = require('webpack')

module.exports = {
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
                        name: 'assets/img/[name].[hash:8].[ext]'
                    }
                },
                include: config.srcPath,
                exclude: config.libPath
            }
        ]
    }
}