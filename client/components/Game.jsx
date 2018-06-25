import React from 'react'
import Roller from './Roller'

const ROLLERS = ['left', 'center', 'right']

export default class Game extends React.Component {
  constructor(props) {
    super(props)

    ROLLERS.forEach(roller => {
      this[roller] = React.createRef()
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this._spinMachine()
    }, 2000)
  }

  _spinMachine() {
    const spins = ROLLERS.map(roller => this[roller].current.spin())

    Promise.all(spins).then(function(values) {
      console.log(values)
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
