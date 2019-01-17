import React, { Component } from 'react'
// import fetch from 'isomorphic-unfetch'

const Select = (props) => {
  let tickers = []
  process.env.SUPPORTED_COINS.split(',').forEach(coin => {
    let selected = false
    if (coin === props.coin) { selected = true }
    let ticker = coin.toUpperCase()
    tickers.push({ticker: ticker, selected: selected})
  })

  return (
    <div className='explorer-select'>
      <p>Selected_coin: {props.coin}</p>
      <ul>
        { tickers.map((v, i) => {
          return (<li key={v.ticker}>{v.ticker}: {v.selected.toString()}</li>)
        })}
      </ul>
    </div>
  )
}

export default Select
