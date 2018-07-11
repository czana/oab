import { toRadians, getR } from '../polygon'

describe('toRadians', () => {
  test('should return proper scaling of angle in radians', () => {
    const angle = 180

    expect(toRadians(angle)).toEqual(Math.PI)
  })
})

describe('getR', () => {
  test('should return radius', () => {
    expect(getR(2, 4).toFixed(10)).toEqual('1.0000000000')
  })
})
