const path = require('path');
module.exports = {
    port: 8000,
    srcPath: path.resolve(__dirname, '..', 'src'),
    buildPath: path.resolve(__dirname, '..', 'dist'),
    libPath: path.resolve(__dirname, '..', 'node_modules'),
    publicPath: '/',
    build: {
        sourceMap: true
    },
    dev: {
        port: 8000,
        proxys: {
            '/api': {
                target: 'http://172.17.17.34:8020',
                changeOrigin: true
            }
        }
    }
};