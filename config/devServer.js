const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');
const config = require('./base.config');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: config.publicPath,
    progress: true,
    stats: { colors: true },
    hot: true,
    quiet: false,
    lazy: false
}));

app.use(require('webpack-hot-middleware')(compiler));

const staticPath = path.posix.join('/', 'static');

app.use(staticPath, express.static('./static'));

app.use('/api', proxy({target: 'http://172.17.17.34:8020', changeOrigin: true}));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(config.port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${config.port}`);
});