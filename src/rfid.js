import SerialPort from 'serialport'

export const parseData = data => {
  return data.replace(/[^0-9A-Fa-f]+/g, '')
}

export default new SerialPort('/dev/ttyUSB0', { baudRate: 9600 }).pipe(
  new SerialPort.parsers.Readline({ delimiter: '\n', encoding: 'ASCII' })
)
