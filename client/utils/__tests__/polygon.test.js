import { toRadians, getR } from '../polygon'

describe('toRadians', () => {
  test('should return proper scaling of angle in radians', () => {
    const angle = 180

    expect(toRadians(angle)).toEqual(Math.PI)
  })
})

describe('getR', () => {
  test('should return radius', () => {
    const e = 0.0000000001

    expect(Math.abs(getR(2, 4) - 1)).toBeLessThan(e)
  })
})
