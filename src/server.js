require('dotenv').config()

import express from 'express'
import getUser from './users'
import http from 'http'
import reader, { parseData } from './rfid'
import redis from 'redis'
import sendPhoto from './queue'
import Slack from './slack'
import socketIO from 'socket.io'
import takePhoto from './camera'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
import webpackMiddleware from 'webpack-dev-middleware'

const app = express()
const server = http.createServer(app)

const io = socketIO(server)
const redisClient = redis.createClient()
const slack = new Slack(process.env.SLACK_WEBHOOK, process.env.SLACK_WEBHOOK)

let readyForSpin = false
let socketClient = null

app.use(webpackMiddleware(webpack(webpackConfig)))
server.listen(3000)

io.on('connection', client => {
  readyForSpin = true
  socketClient = client

  client.on('SPIN_ENDED', result => {
    readyForSpin = true

    if (result.win) {
      const reward = result.cashPrize ? '$$$' : '2 Kudos!'
      slack.post('czana', result.icon, reward)
    }
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
    redisClient.set(id, true, 'EX', 60, 'NX', (_, response) => {
      if (response !== null) {
        readyForSpin = false
        socketClient.emit('SPIN_REQUEST')

        takePhoto(id).then(buffer => {
          sendPhoto(user.email, buffer)
        })
      } else {
        socketClient.emit('NOTIFY', 'warn', 'not yet :)')
      }
    })
  }
})
