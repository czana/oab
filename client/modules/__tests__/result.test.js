import { ICONS, logResult, resultResponse } from '../result'

describe('logResult', () => {
  test('should call console.log with proper icon mapping', () => {
    console.log = jest.fn()
    const state = {
      left: 1,
      center: 2,
      right: 3
    }

    logResult(state)
    expect(console.log).toBeCalledWith(ICONS[1], ICONS[2], ICONS[3])
  })
})

describe('resultResponse', () => {
  test('should return object with false values when numbers are different', () => {
    const result = {
      left: 1,
      center: 1,
      right: 2
    }

    expect(resultResponse(result)).toEqual({ cashPrize: false, icon: false, win: false })
  })

  test('should return object with icon name an win as true when numbers the same', () => {
    const result = {
      left: 1,
      center: 1,
      right: 1
    }

    expect(resultResponse(result)).toEqual({ cashPrize: false, icon: ICONS[1], win: true })
  })

  test('should return object with icon name, win as true and cashPrice when numbers the same and equals 0', () => {
    const result = {
      left: 0,
      center: 0,
      right: 0
    }

    expect(resultResponse(result)).toEqual({ cashPrize: true, icon: ICONS[0], win: true })
  })
})
