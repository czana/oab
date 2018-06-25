import React from 'react'
import ReactDOM from 'react-dom'
import Slot from './Slot'
import Polygon, { getR } from '../modules/polygon'
import { connect } from 'react-redux'
import { sendRollerResult, spinMachine, requestMachineSpin, MACHINE_STATES } from '../store'
import { times } from 'lodash'

const HORIZONTAL_PERSPECTIVE = {
  left: 150,
  center: 50,
  right: -50
}

class Roller extends React.Component {
  constructor(props) {
    super(props)

    this.polygon = new Polygon(props.size, props.count)
    this.spin = this.spin.bind(this)
  }

  componentDidMount() {}

  componentDidUpdate() {
    // if(this.props.machineState === MACHINE_STATES.spinRequested) {
    //   this._spin()
    // }
  }

  spin() {
    return new Promise(resolve => {
      const angle = this.polygon.angle
      const rand = () => Math.floor(Math.random() * 100) * angle

      const random = rand()

      const index = (random / angle) % this.props.count

      const animTime = Math.random() * 3 + 2
      const anim = ` animation: roller-${this.props.position} ${animTime}s ease forwards;`

      setTimeout(() => {
        // this.props.dispatch(sendRollerResult(this.props.position, index))
        resolve(index)
      }, animTime * 1000)

      const ele = document.querySelector(`.roller.${this.props.position}`)
      ele.classList.remove('animate')
      // const styles = document.querySelector(`.roller.${this.props.position}`).getAttribute('style')
      // document.querySelector(`.roller.${this.props.position}`).setAttribute('style', styles + anim)

      ReactDOM.render(
        <style>
          {`.roller.animate.${this.props.position}{ ${anim} }`}

          {`@keyframes roller-${this.props.position} {` +
            ` 0% { transform: rotateX(0); }` +
            ` 90% { transform: rotateX(${random + 5}deg); }` +
            ` 100% { transform: rotateX(${random}deg); }`}
        </style>,
        document.querySelector(`.styles-roller-${this.props.position}`)
      )

      setTimeout(() => ele.classList.add('animate'), 0)
    })
  }

  _createSlots() {
    const { count } = this.props

    return times(count, n => {
      return <Slot key={n} style={this._getSlotStyles(n)} number={n} />
    })
  }

  _getSlotStyles(n) {
    const { translateZ, translateY, rotateX } = this.polygon.valuesFor(n)

    return {
      transform: `translateZ(${translateZ}px) translateY(${translateY}px) rotateX(${rotateX}deg)`
    }
  }

  _getRollerStyles() {
    const { size, count } = this.props

    return {
      transformOrigin: `0 50% -${getR(size, count)}px`,
      width: `${210}px`,
      height: `${size}px`
    }
  }

  _getRollerWrapperStyles() {
    const { position } = this.props

    return {
      perspectiveOrigin: `${HORIZONTAL_PERSPECTIVE[position]}% 50%`
    }
  }

  render() {
    return (
      <div className="roller-wrapper" style={this._getRollerWrapperStyles()}>
        <div className={`styles-roller-${this.props.position}`} />
        <div className={`roller ${this.props.position}`} style={this._getRollerStyles()}>
          {this._createSlots()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    roller: state.rollers,
    machineState: state.game.machineState
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(Roller)
