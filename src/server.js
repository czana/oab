import express from 'express'
import http from 'http'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'

import socketIO from 'socket.io'

const app = express()
app.use(webpackMiddleware(webpack(webpackConfig)))

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', client => {
  client.emit('SPIN_REQUEST')

  client.on('SPIN_ENDED', (result) => {
    console.log(result)

    client.emit('SPIN_REQUEST')
  })
})

server.listen(3000)
