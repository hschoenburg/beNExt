import React from 'react'
import Head from '../../components/head'
import fetch from 'isomorphic-unfetch'

const BlockPage = (props) => (
  <div>
    <Head title='Block' />
    <div className='hero'>
      <h1 className='title'>Block: {props.block}</h1>
      <h3>Coin: {props.coin} </h3>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
    `}</style>
  </div>
)

BlockPage.getInitialProps = async ({ req }) => {
  let block = req.params.block || req.query.block || null
  let coin = req.path.split('/')[2]
  let request = await fetch(process.env.SERVER_URL + '/api/' + coin + '/block/' + block)
  let data = await request.json()
  return { block: data, coin: coin }
}

export default BlockPage
