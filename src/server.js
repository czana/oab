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

const io = socketIO(server)

import SerialPort from 'serialport'
const Readline = SerialPort.parsers.Readline

const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600
})

const parser = port.pipe(new Readline({ delimiter: '\n', encoding: 'ASCII' }))

const client = null

parser.on('data', data => {
  console.log(data)
  const id = data.replace(/[^0-9A-Fa-f]+/g, '')

  client.emit('NOTIFY', 'success', id)
  client.emit('SPIN_REQUEST')
  // console.log(parseInt(datap, 16));
})

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

// setTimeout(() => {
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
// }, 3000)

io.on('connection', client => {
  console.log('client connected')
  client = client
  // client.emit('SPIN_REQUEST')

  // client.on('SPIN_ENDED', result => {
  //   // client.emit('NOTIFY', 'success', 'Another Spin!')
  //   client.emit('SPIN_REQUEST')
  // })
})
