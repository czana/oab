import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Game from './components/Game'
import SocketProvider, { SocketConsumer } from './contexts/SocketContext'
import './styles/game'
import 'react-toastify/dist/ReactToastify.min.css'
import AdminPanel from './containers/AdminPanel'
import { toast, ToastContainer } from 'react-toastify'

ReactDOM.render(
  <SocketProvider>
    <Router>
      <ToastContainer autoClose={5000} position={toast.POSITION.TOP_CENTER} />
      <Switch>
        <Route path="/adminpanel" component={AdminPanel} />
        <Route
          path="/"
          exact
          render={() => <SocketConsumer>{socket => <Game socket={socket} />}</SocketConsumer>}
        />
      </Switch>
    </Router>
  </SocketProvider>,
  document.getElementById('app')
)
