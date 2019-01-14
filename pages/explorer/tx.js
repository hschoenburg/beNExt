import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import fetch from 'isomorphic-unfetch'

const TxPage = (props) => (
  <div>
    <Head title='Block' />
    <div className='hero'>
      <h1 className='title'>Tx: {props.tx}</h1>
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

TxPage.getInitialProps = async ({ req }) => {
  let tx = req.params.tx || req.query.tx || null
  let coin = req.path.split('/')[2]
  let request = await fetch(process.env.SERVER_URL + '/api/' + coin + '/tx/' + tx)
  let data = await request.json()
  return { tx: data, coin: coin }
}

export default TxPage
