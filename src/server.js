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
import { sendImage, getSignedUrl, putImage } from './queue'
import reader, { parseData } from './rfid'
import getUser from './users'
import takePhoto, { filePath } from './camera'

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

    takePhoto(id).then((photo) => {
      console.log(photo)
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

//   getSignedUrl('example@selleo.com').then((res) => {
//     // console.log(res.status, res.data.url)

//     console.log(res.data.url)
//     if(res.status === 200) {
//       const binary = fs.readFileSync('./face.png')
//       console.log('binary')
//       putImage(res.data.url, binary).then((res) => {
//         console.log(res)
//       })
//     }
//   })
