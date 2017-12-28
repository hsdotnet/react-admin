const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const config = require('./base.config');

module.exports = {
    entry: [
        'babel-polyfill', 'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr', './src/index'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: config.publicPath
    },
    devtool: '#source-map',
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: [ { loader: 'babel-loader' } ]
            }, {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9' ],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    }
                ]
            },{
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9' ],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    },
                    { 
                        loader: 'less-loader',
                        options: { modifyVars: { "@primary-color": "#1DA57A" } }
                    }
                ]
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
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:' + config.port
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            },
            '__DEV__': JSON.stringify('true')
        }),

        new HtmlWebpackPlugin({
            template: './public/index.html', 
            filename: 'index.html', 
            favicon: './public/favicon.ico', 
            inject: true
        })
    ]
};