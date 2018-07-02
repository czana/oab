require('dotenv').config()

import express from 'express'
import http from 'http'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'

import socketIO from 'socket.io'

import redis from 'redis'
import SlackWebhook from 'slack-webhook'

const slack = new SlackWebhook(process.env.SLACK_WEBHOOK)
const redisClient = redis.createClient()

redisClient.on('connect', function() {
  setInterval(() => {
    redisClient.set('ID_1', true, 'EX', 120, 'NX', (_, response) => {
      if (response != null) {
        slack.send({
          text: '<!here> <@czana> just got :aw_yeah::aw_yeah::aw_yeah: and won 2 kudos!',
          username: 'Slot Machine'
        })
      }
    })
  }, 2000)
})

const app = express()
app.use(webpackMiddleware(webpack(webpackConfig)))

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', client => {
  // client.emit('SPIN_REQUEST')
  // client.on('SPIN_ENDED', (result) => {
  //   console.log(result)
  //   client.emit('SPIN_REQUEST')
  // })
})

server.listen(3000)
