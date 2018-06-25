import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

export const MACHINE_STATES = {
  idle: 0,
  spinRequested: 1,
  spinning: 2
}

// reducers
const game = (state = { machineState: MACHINE_STATES.idle }, action) => {
  switch (action.type) {
    case 'SPIN_MACHINE':
      return { ...state, machineState: MACHINE_STATES.spinning }
    case 'REQUEST_MACHINE_SPIN':
      return { ...state, machineState: MACHINE_STATES.spinRequested }
    case 'READY_MACHINE':
      return { ...state, machineState: MACHINE_STATES.idle }
    default:
      return state
  }
}

const rollers = (state = {}, action) => {
  switch (action.type) {
    case 'SPIN_ROLLER':
      return { ...state, machineState: MACHINE_STATES.spinning }
    case 'ROLLER_RESULT':
      return { ...state, ...action.payload }
    case 'REQUEST_MACHINE_SPIN':
      return {}
    default:
      return state
  }
}

// actions
export const sendRollerResult = (position, result) => ({
  type: 'ROLLER_RESULT',
  payload: { [position]: result }
})

export const spinMachine = () => ({
  type: 'SPIN_MACHINE'
})

export const requestMachineSpin = () => ({
  type: 'REQUEST_MACHINE_SPIN'
})

export const readyMachine = () => ({
  type: 'READY_MACHINE'
})

export const store = createStore(combineReducers({ game, rollers }), devToolsEnhancer())
