import React, { Component } from 'react'
// import fetch from 'isomorphic-unfetch'

class Address extends Component {
  constructor (props) {
    super(props)

    this.state = {
      addr: props.address || null
    }
  }

  render () {
    return (
      <div className='address-comp'>
        <h2>Address f() coming soon </h2>
        <p>Addr: {this.state.addr}</p>
      </div>
    )
  }
}

export default Address
