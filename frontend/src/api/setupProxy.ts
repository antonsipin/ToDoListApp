const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app: { use: (arg0: any) => void }) {
    app.use(createProxyMiddleware('/api', {target: 'http://localhost:3100'}))
}