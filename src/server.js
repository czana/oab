require('dotenv').config()

import express from 'express'
import http from 'http'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'
import fs from 'fs'
import socketIO from 'socket.io'
import redis from 'redis'
import Slack from './slack'
import sendPhoto from './queue'
import reader, { parseData } from './rfid'
import getUser from './users'
import takePhoto from './camera'
import kue from 'kue'

const app = express()
const server = http.createServer(app)

const io = socketIO(server)
const redisClient = redis.createClient()
const slack = new Slack(process.env.SLACK_WEBHOOK, process.env.SLACK_WEBHOOK)

let readyForSpin = false
let socketClient = null

app.use(webpackMiddleware(webpack(webpackConfig)))
kue.app.listen(4000);
server.listen(3000)

io.on('connection', client => {
  readyForSpin = true
  socketClient = client

  client.on('SPIN_ENDED', result => {
    readyForSpin = true
  })
})

reader.on('data', data => {
  const id = parseData(data)
  const user = getUser(id)

  if (user === undefined) {
    slack.log(id)
    socketClient.emit('NOTIFY', 'error', 'please go to @czana')
    return
  }

  if (readyForSpin) {
    readyForSpin = false
    socketClient.emit('SPIN_REQUEST')

    takePhoto(id).then((buffer) => {
      sendPhoto(user.email, buffer)
    })
  }
})

// redisClient.on('connect', function() {
//   setInterval(() => {
//     redisClient.set('ID_3', true, 'EX', 120, 'NX', (_, response) => {
//       if (response !== null) {
//         slack.post('czana', 'awthanks', '50zl')
//       }
//     })
//   }, 2000)
// })
