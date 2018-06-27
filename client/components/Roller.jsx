import React from 'react'
import ReactDOM from 'react-dom'
import Slot from './Slot'
import Animation from './Animation'
import Polygon, { getR } from '../modules/polygon'
import { times, random } from 'lodash'

const HORIZONTAL_PERSPECTIVE = {
  left: 150,
  center: 50,
  right: -50
}

export default class Roller extends React.Component {
  constructor(props) {
    super(props)

    this.polygon = new Polygon(props.height, props.count)
    this.spin = this.spin.bind(this)
  }

  spin(startingIndex = 0) {
    return new Promise(resolve => {
      const { count, position } = this.props

      const rotations = random(20, 40)
      const animationTime = random(3, 5, true)

      const rollerElement = document.querySelector(`.roller.${position}`)
      rollerElement.classList.remove('animate')
      setTimeout(() => rollerElement.classList.add('animate'))

      setTimeout(() => {
        resolve({ [position]: (startingIndex + rotations) % count })
      }, animationTime * 1000 + 500)

      ReactDOM.render(
        <Animation
          startingIndex={startingIndex}
          position={position}
          animationTime={animationTime}
          rotations={rotations}
          angle={this.polygon.angle}
          offset={5}
        />,
        document.querySelector(`.styles-roller-${position}`)
      )
    })
  }

  _createSlots() {
    const { count } = this.props

    return times(count, number => {
      return <Slot key={number} polygon={this.polygon} number={number} />
    })
  }

  _getRollerStyles() {
    const { width, height, count } = this.props

    return {
      transformOrigin: `0 50% -${getR(height, count)}px`,
      width: `${width}px`,
      height: `${height}px`
    }
  }

  _getRollerWrapperStyles(position) {
    return {
      perspectiveOrigin: `${HORIZONTAL_PERSPECTIVE[position]}% 50%`
    }
  }

  render() {
    const { position } = this.props

    return (
      <div className="roller-wrapper" style={this._getRollerWrapperStyles(position)}>
        <div className={`styles-roller-${position}`} />

        <div className={`roller ${position}`} style={this._getRollerStyles()}>
          {this._createSlots()}
        </div>
      </div>
    )
  }
}
