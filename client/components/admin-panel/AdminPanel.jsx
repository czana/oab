import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ActionButton from '@components/admin-panel/ActionButton'
import withSocket from '@wrappers/withSocket'
import '@styles/admin_panel'

class AdminPanel extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
    this._setActive = this._setActive.bind(this)
  }

  componentDidMount() {
    this.props.socket.on('SET_ADMIN_PANEL_ACTIVE', this._setActive)
  }

  _setActive(value) {
    this.setState({ active: value })
  }

  _getWrapperClass(active) {
    const classes = ['admin-panel']
    if (active) { classes.push('active') }
    return classes.join(' ')
  }

  render() {
    const { active } = this.state

    return (
      <div className={this._getWrapperClass(active)}>
        <div className='admin-panel__actions'>
          <ActionButton text='Reboot' socketAction='@admin/REBOOT' />
          <ActionButton text='Shutdown' socketAction='@admin/SHUTDOWN' />
          <ActionButton text='Trigger servo' socketAction='@admin/TRIGGER_SERVO' />
          <a className='close' onClick={() => this._setActive(false)}>
            Close
          </a>
        </div>
      </div>
    )
  }
}

AdminPanel.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired
  }).isRequired
}

export default withSocket(AdminPanel)
