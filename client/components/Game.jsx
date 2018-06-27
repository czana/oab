import React from 'react'
import Roller from './Roller'
import socketIOClient from 'socket.io-client'

const ROLLERS = ['left', 'center', 'right']

const ICONS = [
  'Seven',
  'Cherry',
  'Diamond',
  'Lemon',
  'Horseshoe',
  'Bag',
  'Orange',
  'Plum',
  'Bar',
  'Watermelon',
  'Cloverleaf',
  'Bell'
]

export default class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    ROLLERS.forEach(roller => {
      this[roller] = React.createRef()
    })

    this.socket = socketIOClient('http://localhost:3000')
  }

  componentDidMount() {
    this.socket.on('SPIN_REQUEST', () => this._spinMachine())
  }

  _spinMachine() {
    const spins = ROLLERS.map(roller => this[roller].current.spin(this.state[roller]))

    Promise.all(spins).then(results => {
      const state = this._formatResults(results)

      console.log(ICONS[state.left], ICONS[state.center], ICONS[state.right])

      this.socket.emit('SPIN_ENDED', state)

      this.setState(state)
    })
  }

  _formatResults(results) {
    return Object.values(results).reduce((a, v) => ({ ...a, ...v }), {})
  }

  _createRollers() {
    return ROLLERS.map(roller => (
      <Roller
        key={roller}
        ref={this[roller]}
        position={roller}
        height={170}
        width={210}
        count={12}
      />
    ))
  }

  render() {
    return (
      <div className="rollers">
        <div className="overlay" />
        {this._createRollers()}
      </div>
    )
  }
}
