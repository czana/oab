import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LastUser from './LastUser'

class Panel extends Component {
  constructor(props) {
    super(props)
    this.socket = props.socket
    this.state = { lastUser: '' }
  }

  componentDidMount() {
    this.socket.emit('GET_LAST_USER', user => {
      console.log('user: ', user)
      this.setState({ lastUser: user })
    })
  }

  render() {
    return (
      <div id="panel">
        <div className="sidebar">
          <button
            className="btn"
            onClick={() => {
              this.socket.emit('TEST', 'win')
            }}
          >
            Test win
          </button>
          <button
            className="btn"
            onClick={() => {
              this.socket.emit('TEST', 'win7')
            }}
          >
            Test 7 win
          </button>
          <button
            className="btn"
            onClick={() => {
              this.socket.emit('TEST', 'servo')
            }}
          >
            Test servo
          </button>
        </div>
        <Link to="/" className="btn btn-exit">
          Exit
        </Link>
        <Link to="/adminPanel/stats" className="btn btn-stats">
          Stats
        </Link>
        <LastUser user={this.state.lastUser} />
      </div>
    )
  }
}

export default Panel
