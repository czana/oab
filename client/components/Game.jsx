import React from 'react'
import Roller from './Roller'
import socketIOClient from 'socket.io-client'
import { logResult, resultResponse } from '../modules/result'
import { ToastContainer, toast } from 'react-toastify'

import withSocket from '@wrappers/withSocket'
import AdminPanel from '@components/admin-panel/AdminPanel'

const ROLLERS = ['left', 'center', 'right']

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    ROLLERS.forEach(roller => {
      this[roller] = React.createRef()
    })
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('SPIN_REQUEST', forcedSpinTo => this._spinMachine(forcedSpinTo))
    socket.on('NOTIFY', (type, message) => toast[type](message))
  }

  _spinMachine(forcedSpinTo) {
    const spins = ROLLERS.map(roller => this[roller].current.spin(this.state[roller], forcedSpinTo))

    Promise.all(spins).then(results => {
      const state = Object.values(results).reduce((a, v) => ({ ...a, ...v }), {})
      this.setState(state)

      this.socket.emit('SPIN_ENDED', resultResponse(state))
    })
  }

  _createRollers() {
    return ROLLERS.map(roller => (
      <Roller
        key={roller}
        ref={this[roller]}
        position={roller}
        height={170}
        width={210}
        count={10}
      />
    ))
  }

  render() {
    return (
      <div className="rollers">
        <ToastContainer autoClose={5000} position={toast.POSITION.TOP_CENTER} />
        <AdminPanel />
        <div className="overlay" />
        {this._createRollers()}
      </div>
    )
  }
}

export default withSocket(Game);
