import React from 'react'
import Roller from './Roller'
import { resultResponse } from '../modules/result'
import { Link } from 'react-router-dom'

const ROLLERS = ['left', 'center', 'right']

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.socket = props.socket

    ROLLERS.forEach(roller => {
      this[roller] = React.createRef()
    })
  }

  componentDidMount() {
    this.socket.on('SPIN_REQUEST', forcedSpinTo => this._spinMachine(forcedSpinTo))
    this.socket.on('ADMIN', () => {
      props.history.push('/adminpanel')
    })
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
      <div id="game">
        <div className="rollers">
          <div className="overlay" />
          {this._createRollers()}
          <div
              style={{
                'z-index': '9999',
                position: 'absolute',
                background: 'rgba(255,12,34,0.5)',
                padding: '12px'
              }}
          >
            <Link to="/adminpanel">AdminPanel</Link>
          </div>
        </div>
      </div>
    )
  }
}
