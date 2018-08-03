import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withSocket from '@wrappers/withSocket'

class ActionButton extends Component {
  _onClick(message) {
    this.props.socket.emit(message)
  }

  render() {
    const { text, socketAction } = this.props

    return (
      <a href='#' onClick={() => this._onClick(socketAction)}>{text}</a>
    )
  }
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  socketAction: PropTypes.string.isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired
  }).isRequired
}

export default withSocket(ActionButton)
