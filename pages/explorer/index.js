import React from 'react'
import Head from '../../components/head'
//import Link from 'next/link'
//import Search from '../../components/search'
//import ErrorMsg from '../../components/utils/error_msg'
// import Block from '../../components/block'
// import Address from '../../components/address'
import fetch from 'isomorphic-unfetch'

// Container Component with Search bar and History functionality
class Explorer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: props.error || null
      // fill history with objects of type
      // {type: 'block/tx/addr', val: ""}
    }
  }

  render () {
    return (
      <div>
        <Head title='Explorer' />

        <div className='hero'>
          <h1 className='title'>Coin {JSON.stringify(this.props)}</h1>
          <p className='description'>
            Make Crypto Useful
          </p>
        </div>
      </div>
    )
  }
}

Explorer.getInitialProps = async ({ req }) => {
  // TODO fetch latest transactions and blocks
  let apiUrl = process.env.SERVER_URL + '/api/' + req.params.coin

  let reqTxs = await fetch(apiUrl + '/txs')
  let latest = reqTxs.json()
  let coin = req.params.coin

  let reqBlocks = await fetch(apiUrl + '/blocks')
  let blocks = await reqBlocks.json()
  return { coin, latest, blocks }
}

export default Explorer
