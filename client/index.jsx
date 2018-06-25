import React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/Game'

import { store } from './store'
import { Provider } from 'react-redux'

import './styles/game'

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('game')
)
