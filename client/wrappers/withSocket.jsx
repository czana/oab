import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

let socket

export default function withSocket(WrappedComponent) {
  class WithSocket extends Component {
    constructor(props) {
      super(props)

      if (!socket) {
        socket = socketIOClient('http://localhost:3000')
      }
    }

    render() {
      return (
        <WrappedComponent socket={socket} {...this.props} />
      )
    }
  }

  WithSocket.displayName = `WithSocket(${WrappedComponent.name})`

  return WithSocket;
}
