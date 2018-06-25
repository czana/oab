import express from 'express'
import router from './router'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'

const app = express()

// app.use('/', router)
app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(3000)
