import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import { toast } from 'react-toastify'

const SocketContext = React.createContext()

export const SocketConsumer = SocketContext.Consumer

class SocketProvider extends Component {
  socket = socketIOClient('http://localhost:3000')

  render() {
    this.socket.on('NOTIFY', (type, message) => {
      toast[type](message)
    })
    return (
      <SocketContext.Provider value={this.socket}>{this.props.children}</SocketContext.Provider>
    )
  }
}

export default SocketProvider
