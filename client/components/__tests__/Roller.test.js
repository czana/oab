import React from 'react'
import renderer from 'react-test-renderer'
import Roller from '../Roller'

describe('<Roller />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(<Roller {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
