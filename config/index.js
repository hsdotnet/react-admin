const path = require('path')

module.exports = {
    srcPath: path.resolve(__dirname, '..', 'src'),
    libPath: path.resolve(__dirname, '..', 'node_modules'),
    build: {
        env: 'production',
        buildPath: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
        jsDirectory: 'assets/js',
        cssDirectory: 'assets/css',
        imageDirectory: 'assets/images',
        fontDirectory: 'assets/fonts',
        sourceMap: true
    },
    dev: {
        env: 'development',
        buildPath: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
        jsDirectory: 'assets/js',
        cssDirectory: 'assets/css',
        imageDirectory: 'assets/images',
        fontDirectory: 'assets/fonts',
        port: 8000,
        proxys: {
            '/api': {
                target: 'http://172.17.17.34:8091',
                changeOrigin: true
            }
        }
    }
}