import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Panel from './Panel'
import Stats from './Stats'
import { SocketConsumer } from '../../contexts/SocketContext'

const AdminPanel = () => {
  return (
    <SocketConsumer>
      {socket => (
        <div id="adminpanel">
          <Switch>
            <Route path="/adminpanel/stats" component={Stats} />
            <Route path="/adminpanel" exact render={() => <Panel socket={socket} />} />} />
          </Switch>
        </div>
      )}
    </SocketConsumer>
  )
}

export default AdminPanel
