const SearchBar = (props) => {
  return (
    <div className='explorer-search'>
      <form>
        <input type='text' id='ExplorerSearchBar' />
        <input type='submit' value='Search' />
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

const SearchBarSelect = ({ COINS, coin }) => {
  return (
    <div>
      <select id='coin-select'>
        {COINS.map(c => {
          //let selected = c === coin ? 'selected' : ''
          return (<option key={c} value={c} defaultValue={coin}>{c}</option>)
        })}
      </select>
    </div>
  )
}

export default SearchBar
