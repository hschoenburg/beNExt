import React from 'react'
import Link from 'next/link'
import Head from '../components/head'

const Home = () => (
  <div>
    <Head title='Home' />

    <div className='hero'>
      <h1 className='title'>Welcome to Block Explorer</h1>
      <p className='description'>
        Building the next great crypto news and tools website.
      </p>

      <div className='row'>
        <Link prefetch href='/explorer'>
          <a className='card'>
            <h3>Explorer</h3>
            <p>Bitcoin transactions, addresses and blocks oh my. Backend - bcoin</p>
          </a>
        </Link>
        <Link prefetch href='/market'>
          <a className='card'>
            <h3>Market</h3>
            <p>XRP, ETH, BTC prices prices prices. Backend - CoinMarketCap and more</p>
          </a>
        </Link>
        <Link href='/news'>
          <a className='card'>
            <h3>News</h3>
            <p>Headlines, articles, news. Backend - Wordpress </p>
          </a>
        </Link>
      </div>
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
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home
