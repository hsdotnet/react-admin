const config = require('./index');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = config.dev.env
}

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.config')
const proxyMiddleware = require('http-proxy-middleware')
const port = process.env.PORT || config.dev.port
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const proxys = config.dev.proxys
const app = express()
const compiler = webpack(webpackConfig)

Object.keys(proxys).forEach(function (context) {
    var options = proxys[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-history-api-fallback')())

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    progress: true,
    stats: { colors: true },
    hot: true,
    quiet: false,
    lazy: false
}));

app.use(require('webpack-hot-middleware')(compiler));


const staticPath = path.posix.join('/', 'static');
app.use(staticPath, express.static('./static'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(config.port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${config.dev.port}`);
});