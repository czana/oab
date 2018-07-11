import React from 'react'
import ReactDOM from 'react-dom'
import times from 'lodash/times'
import random from 'lodash/random'

import Slot from './Slot'
import Animation from './Animation'
import Polygon, { getR } from '../modules/polygon'

export default class Roller extends React.Component {
  constructor(props) {
    super(props)

    this.polygon = new Polygon(props.height, props.count)
    this.spin = this.spin.bind(this)
  }

  spin(startingIndex = 0, forcedSpinTo) {
    return new Promise(resolve => {
      const { count, position } = this.props

      let rotations = random(30, 50)
      const animationTime = random(3, 6, true)

      if (isFinite(forcedSpinTo)) {
        rotations = 3 * count + forcedSpinTo - startingIndex
      }

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
    return times(this.props.count, number => {
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

  render() {
    const { position } = this.props

    return (
      <div className={`roller-wrapper ${position}`}>
        <div className={`styles-roller-${position}`} />

        <div className={`roller ${position}`} style={this._getRollerStyles()}>
          {this._createSlots()}
        </div>
      </div>
    )
  }
}
