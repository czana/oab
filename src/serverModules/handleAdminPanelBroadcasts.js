import shell from 'shelljs'

import raspberryOnly from '../utils/raspberryOnly'

let servo

raspberryOnly(() => {
  servo = require('../servo')['default']
})

export default (client) => {
  client.on('@admin/REBOOT', () => {
    raspberryOnly(() => {
      shell.exec('sudo reboot')
      client.emit('SET_ADMIN_PANEL_ACTIVE', false);
    })
  })

  client.on('@admin/SHUTDOWN', () => {
    raspberryOnly(() => {
      shell.exec('sudo shutdown -P now')
      client.emit('SET_ADMIN_PANEL_ACTIVE', false);
    })
  })

  client.on('@admin/TRIGGER_SERVO', () => {
    raspberryOnly(() => {
      servo.move()
      client.emit('SET_ADMIN_PANEL_ACTIVE', false);
    })
  })
}
