import React from 'react'

export default class Animation extends React.Component {
  render() {
    const { position, animationTime, rotations, angle, offset, startingIndex } = this.props

    const rotationInDegree = rotations * angle
    const animation = `roller-${position} ${animationTime}s ease forwards`

    return (
      <style>
        {`.roller.animate.${position}{ animation: ${animation}; }` +
          `@keyframes roller-${position} {` +
          `0% { transform: rotateX(${startingIndex * angle}deg); }` +
          `90% { transform: rotateX(${rotationInDegree + offset}deg); }` +
          `100% { transform: rotateX(${rotationInDegree}deg); }`}
      </style>
    )
  }
}
