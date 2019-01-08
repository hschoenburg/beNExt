import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
//import Block from '../../components/block'

// Iniital props
// then getblockbyheight for most recent blocks
// List blocks
// List Transactions
// then getblock onClick

const BlockPage = (props) => (
  <div>
    <Head title='Block' />
    <Nav />
    <div className='hero'>
      <h1 className='title'>Block: {props.hash}</h1>
    </div>
    <Block hash={props.hash} />

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
  let hash = req.params.hash || req.query.hash || null
  return { hash: hash }
}

export default BlockPage
