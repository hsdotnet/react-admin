const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pk = require('../package.json');
const config = require('./base.config');

let getDependencies = () => {
    let deps = Object.keys(pk.dependencies);
    if (deps.indexOf('babel-runtime') != -1) {
        deps.splice(deps.indexOf('babel-runtime'), 1);
    }
    return deps;
}

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: getDependencies()
    },
    output: {
        path: config.buildPath,
        publicPath: config.publicPath,
        filename: 'assets/js/[name].[chunkhash:8].js',
        chunkFilename: 'assets/js/[name].[chunkhash:8].js'
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: { loader: 'babel-loader' }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true
                            }
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
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
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
                })
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
        new webpack.optimize.UglifyJsPlugin({ 
            compress: { warnings: false }, 
            sourceMap: false, 
            comments: false 
        }),
        new ExtractTextPlugin({
            filename: 'assets/css/[name].[chunkhash:8].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            inject: true,
            chunks: ['app', 'vendor']
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true, 
            debug: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', 
            filename: 'assets/js/[name].[chunkhash:8].js',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};