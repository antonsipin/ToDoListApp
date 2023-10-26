import { createProxyMiddleware } from 'http-proxy-middleware'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(app: { use: (arg0: any) => void }) {
    app.use(createProxyMiddleware('/api', {target: 'http://localhost:3100'}))
}