require('dotenv').config()

import express from 'express'
import http from 'http'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'

import socketIO from 'socket.io'
import redis from 'redis'
import Slack from './slack'

const redisClient = redis.createClient()
const slack = new Slack(process.env.SLACK_WEBHOOK)

// redisClient.on('connect', function() {
//   setInterval(() => {
//     redisClient.set('ID_3', true, 'EX', 120, 'NX', (_, response) => {
//       if (response !== null) {
//         slack.post('czana', 'awthanks', '50zl')
//       }
//     })
//   }, 2000)
// })

const app = express()
app.use(webpackMiddleware(webpack(webpackConfig)))

const server = http.createServer(app)
server.listen(3000)

const io = socketIO(server)

io.on('connection', client => {
  client.emit('SPIN_REQUEST')

  client.on('SPIN_ENDED', result => {
    client.emit('SPIN_REQUEST')
  })
})
