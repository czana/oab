import React from 'react'
import Roller from './Roller'
import { connect } from 'react-redux'
import { spinMachine } from '../store'

const ROLLERS = ['left', 'center', 'right']

class Game extends React.Component {
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
    const spins = ROLLERS.map(roller => this[roller].current.getWrappedInstance().spin())

    Promise.all(spins).then(function(values) {
      console.log(values);
    });
  }

  _createRollers() {
    return ROLLERS.map(roller => (
      <Roller key={roller} position={roller} ref={this[roller]} size={170} count={12} />
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

const mapStateToProps = state => {
  return {
    rollers: state.rollers,
    machine: state.game
  }
}

export default connect(mapStateToProps)(Game)
