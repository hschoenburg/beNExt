import React, { Component } from 'react'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: null,
    }
  }

  onSearchChange = (e) => {
    this.setState({term: event.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let term = this.state.term.trim()
    let type

    // block hash 0c576727f2eb23ed475864b3fed8e94c78e60dce88c7947c5b630271642fb8c8
    // tx hash b19a283f52401045320daef78ff94dcdf4287e52364fbcc15ca79068dcd8fe1b
    // height 50192
    // addr ts1qwkhrxf84ntwgw5gndj33kh2u52e09s63gsvnd9
    //
    let len = term.length
    switch(true) {
      case (len === 42):
        type = "addr"
        break
      case (len === 64):
        type = "hash"
        break
      case (Number.isInteger(Number(term))):
        type = "height"
        break
      default:
        type = "unknown"
        break
    }

    this.props.update(null, {type: type, value: term})
    
  }

  render () {
    return (
      <div className='explorer-search'>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onSearchChange} type='text' id='ExplorerSearch' />
          <input type='submit' value='Search' />
        </form>
        <style jsx>{`
        input[type=text] {
          width: 450px;
          height: 24px;
          font-size: 16px;
          }

        `}</style>
      </div>
    )
  }
}

export default Search
