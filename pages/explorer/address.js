import React from 'react'
// import {withRouter} from 'next/router'
import Head from '../../components/head'
// import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const AddressPage = (props) => (
  <div>
    <Head title='Address' />
    <div className='hero'>
      <h1 className='title'>Address: {props.address}</h1>
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

AddressPage.getInitialProps = async ({ req }) => {
  let coin = req.path.split('/')[1]
  let request = await fetch(process.env.SERVER_URL + '/api/ex/' + coin + '/address/' + req.params.eddress)
  let data = await request.json()
  return { address: req.params.address, coin: coin }
}

export default AddressPage
