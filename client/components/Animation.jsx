import React from 'react'

export default class Animation extends React.Component {
  componentDidMount() {
    // const rollerElement = document.querySelector(`.roller.${this.props.position}`)
    // rollerElement.classList.remove('animate')
    // setTimeout(() => rollerElement.classList.add('animate'))
  }

  render() {
    const { position, animationTime, rotations, angle, offset, startingIndex } = this.props

    const startingRotationInDegree = startingIndex * angle
    const rotationInDegree = startingRotationInDegree + (rotations * angle)
    const animation = `roller-${position} ${animationTime}s ease forwards`

    return (
      <style>
        {`.roller.animate.${position}{ animation: ${animation}; }` +
          `@keyframes roller-${position} {` +
          `0% { transform: rotateX(${startingRotationInDegree}deg); }` +
          `90% { transform: rotateX(${rotationInDegree + offset}deg); }` +
          `100% { transform: rotateX(${rotationInDegree}deg); }`}
      </style>
    )
  }
}
