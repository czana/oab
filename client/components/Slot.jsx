import React from 'react'

class Slot extends React.Component {
  render() {
    return (
      <div style={this.props.style} className='slot'>
        <img src={ require(`../images/icon-${this.props.number + 1}.png`) } />
      </div>
    )
  }
}

export default Slot
