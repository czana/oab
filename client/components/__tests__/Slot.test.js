import React from 'react'
import renderer from 'react-test-renderer'
import Slot from '../Slot'

describe('<Slot />', () => {
  const defaultProps = {
    polygon: {
      valuesFor: () => ({
        translateZ: 10,
        translateY: 10,
        rotateX: 10
      })
    },
    number: 0
  }
  const wrapper = renderer.create(<Slot {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
