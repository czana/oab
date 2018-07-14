import React from 'react'
import renderer from 'react-test-renderer'
import Roller from '../Roller'

describe('<Roller />', () => {
  const defaultProps = {
    position: 'left',
    width: 100,
    height: 100,
    count: 10
  }

  const wrapper = renderer.create(<Roller {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
