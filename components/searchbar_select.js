const SearchBar = (props) => {
  return (
    <div className='explorer-search'>
      <p>Coin: {props.coin}</p>
      <form>
        <input type='text' id='ExplorerSearchBar' />
        <input type='submit' value='SearchBar' />
        <SearchBarSelect {...props} />
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

const SearchBarSelect = (props) => {
  return (
    <select id='coin-select'>
      { props.coins.forEach(c => {
        let selected = props.coin === c ? 'selected' : ''
        return (<option value='{c}' selected={selected}>{c.toUpperCase()}</option>)
      	})
			}
    </select>
  )
}

  /*
const onSearchBarChange = (e) => {
  this.setState({term: event.target.value})
}

const handleSubmit = (e) => {
  e.preventDefault()
  let term = this.state.term.trim()
  let type

// block hash 0c576727f2eb23ed475864b3fed8e94c78e60dce88c7947c5b630271642fb8c8
// tx hash b19a283f52401045320daef78ff94dcdf4287e52364fbcc15ca79068dcd8fe1b
// height 50192
// addr ts1qwkhrxf84ntwgw5gndj33kh2u52e09s63gsvnd9
//
  let len = term.length
  switch (true) {
    case (len === 42):
      type = 'addr'
      break
    case (len === 64):
      type = 'hash'
      break
    case (Number.isInteger(Number(term))):
      type = 'height'
      break
    default:
      type = 'unknown'
      break
  }
  this.props.update(null, {type: type, value: term})
}

*/

const selectCoin = (coin) => {
  console.log(coin)
  // let newState = Object.assign({}, {coin: coin}, this.state)
  // this.setState(newState)
}

export default SearchBar
