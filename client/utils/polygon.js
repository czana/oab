class Polygon {
  constructor(size, count) {
    this.size = size
    this.count = count
    this.angleInterval = 360 / count
    this.r = getR(size, count)
  }

  get angle() {
    return this.angleInterval
  }

  valuesFor(n) {
    const angle = this.angleInterval * n

    return {
      translateZ: this.r * Math.cos(toRadians(angle)) - this.r,
      translateY: this.r * Math.sin(toRadians(angle)),
      rotateX: -angle
    }
  }
}

export const toRadians = angle => {
  return angle * (Math.PI / 180)
}

export const getR = (size, count) => {
  return size / (2 * Math.tan(Math.PI / count))
}

export default Polygon
