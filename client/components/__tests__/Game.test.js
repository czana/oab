import React from 'react'
import renderer from 'react-test-renderer'
import Game from '../Game'

describe('<Game />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(<Game {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
