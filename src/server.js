import raspberryOnly from './utils/raspberryOnly'

require('dotenv').config()

import express from 'express'
import getUser from './users'
import http from 'http'
import reader, { parseData } from './rfid'
import redis from 'redis'
import moment from 'moment'
import sendPhoto from './queue'
import Slack from './slack'
import socketIO from 'socket.io'
import takePhoto from './camera'
import handleSpinResult from './handlers/handleSpinResult'
import handleTesting from './handlers/handleTesting'

const app = express()
const server = http.createServer(app)

const io = socketIO(server)
const redisClient = redis.createClient()
const slack = new Slack(process.env.SLACK_WEBHOOK, process.env.SLACK_LOG_WEBHOOK)
const ROLL_COOLDOWN = 14400

let readyForSpin = false
let socketClient = null
let user = null

server.listen(3000)

function _rollRequest(userId) {
  if (readyForSpin) {
    if (user === undefined) {
      slack.log(userId)
      socketClient.emit('NOTIFY', 'error', 'please go to @czana')
      return
    }
    redisClient.get(userId, (_, response) => {
      !user.admin && redisClient.set('LAST_USER', `${user.id} / ${user.mention}`)
      if(user.admin)
      {
        socketClient.emit('ADMIN')
        return
      }
      if (response === null) {
        redisClient.set(userId, +new Date(), 'EX', ROLL_COOLDOWN, (_, response) => {
          readyForSpin = false
          socketClient.emit('SPIN_REQUEST')

          takePhoto(userId).then(_ => {
            // sendPhoto(user.email, userId)
          })
        })
      } else {
        socketClient.emit('NOTIFY', 'error', _generateCooldownMessage(response))
      }
    })
  }
}
function _testServo() {
  raspberryOnly(() => {
    const servo = require('./servo')
    servo.move()
  })
}
function _testWin(seven) {
  const icons = [
    'bell',
    'plum',
    'lemon',
    'cherry',
    'orange',
    'diamond',
    'horseshoe',
    'watermelon',
    'cloverleaf'
  ]
  const randomIndex = Math.floor(Math.random() * icons.length)
  const randomIcon = icons[randomIndex]
  let result
  if (seven) {
    result = { win: true, icon: 'seven', cashPrize: true }
  } else {
    result = { win: true, icon: randomIcon, cashPrize: false }
  }
  handleTesting(result)
}
function _getLastUser() {
  redisClient.get('LAST_USER', (_, response) => {
    console.log('db: ', response)
    return response
  })
}
function _generateCooldownMessage(rollEpoch) {
  const cooldownEpoch = parseInt(rollEpoch) + ROLL_COOLDOWN * 1000
  const duration = moment.utc(moment(cooldownEpoch).diff(+new Date()))
  const seconds = duration / 1000

  let format
  if (seconds > 3600) {
    format = 'H [hours and] m [minutes]'
  } else if (seconds > 60) {
    format = 'm [minutes]'
  } else {
    format = '[only] s [seconds] :)'
  }

  const time = duration.format(format).toString()
  return 'You need to wait ' + time + ' for the next roll!'
}

io.on('connection', client => {
  readyForSpin = true
  socketClient = client

  client.on('SPIN_ENDED', result => {
    readyForSpin = true
    handleSpinResult(result, user)
  })
  client.on('TEST', type => {
    switch (type) {
      case 'servo':
        _testServo()
        break
      case 'win':
        _testWin()
        break
      case 'win7':
        _testWin(true)
        break
      default:
        socketClient.emit('NOTIFY', 'error', 'Invalid test type')
        return
    }
    socketClient.emit('NOTIFY', 'info', 'Test Completed')
  })
  client.on('GET_LAST_USER', callback => {
    redisClient.get('LAST_USER', (_, response) => {
      callback(response)
    })
  })
})

reader.on('data', data => {
  const userId = parseData(data)
  user = getUser(userId)
  _rollRequest(userId)
})
