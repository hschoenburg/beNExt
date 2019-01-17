import React from 'react'
import Head from '../../components/head'
// import Link from 'next/link'
// import Search from '../../components/search'
// import ErrorMsg from '../../components/utils/error_msg'
// import Block from '../../components/block'
// import Address from '../../components/address'
import fetch from 'isomorphic-unfetch'
import Select from 'react-select'

const coinOptions = process.env.SUPPORTED_COINS.split(',').map(c => { return {value: c, label: c.toUpperCase()} })

// Container Component with Search bar and History functionality
class Explorer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: props.error || null,
      coin: props.coin,
      blocks: props.blocks,
      txs: props.txs
      // fill history with objects of type
      // {type: 'block/tx/addr', val: ""}
    }
    //this.handleCoinSwitch = this.handleCoinSwitch.bind(this)
  }

  static async getInitialProps ({ req }) {
    let coin = req.params.coin || 'btc'
    let txs = await this.getTxs(coin)
    let blocks = await this.getBlocks(coin)
    let data = { coin, txs, blocks }
    console.log(data)
    console.log('########################')
    return data
  }

  static async handleCoinSwitch (selected) {
    let coin = selected.value
    let txs = await this.getTxs(coin)
    let blocks = await this.getBlocks(coin)
    console.log('switchinhg: ' + coin)
    let newState = { coin: coin, txs: txs, blocks: blocks }
    return this.setState(newState)
  }

  static async getTxs (coin) {
    let url = process.env.SERVER_URL + '/api/ex/' + coin + '/txs'
    let req = await fetch(url)
    let data = req.json()
    return data
  }

  static async getBlocks (coin) {
    let url = process.env.SERVER_URL + '/api/ex/' + coin + '/blocks'
    let req = await fetch(url)
    let data = await req.json()
    return data
  }

  render () {
    let selected = coinOptions.find(o => {
      return o.value === this.state.coin
    })
    return (
      <div>
        <p>State: {JSON.stringify(this.state)}</p>
        <Head title='Explorer' />

        <div className='hero'>
          <h1 className='title'>Coin {this.state.coin}</h1>
          <p>Txs: {JSON.stringify(this.state.txs)}</p>
          <p>Blocks: {JSON.stringify(this.state.blocks)}</p>
          <p>Explorer Select</p>
          <Select
            name={'coin-select'}
            value={selected}
            onChange={handleCoinSwitch}
            options={coinOptions}
            instanceId={`id-${this.state.coin}`}
          />
          <p className='description'>
            Make Crypto Useful
          </p>
        </div>
      </div>
    )
  }
}

// implement get Blocks and get Transactions

  // TODO fetch latest transactions and blocks
  /*
  let apiUrl = process.env.SERVER_URL + '/api/ex/' + coin

  let reqTxs = await fetch(apiUrl + '/txs')
  let latest = reqTxs.json()

  let reqBlocks = await fetch(apiUrl + '/blocks')
  let blocks = await reqBlocks.json()
  return { coin, latest, blocks }
  */

export default Explorer
