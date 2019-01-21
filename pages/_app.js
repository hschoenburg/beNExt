import React from 'react'
import App, { Container } from 'next/app'
import fetch from 'isomorphic-unfetch'

import SideBar from '../components/sidebar'
import Nav from '../components/nav'
// import cachedFetch, { overrideCache } from '../lib/cached_json_fetch'

const EX_API = process.env.SERVER_URL + '/api/ex/'
const COINS = process.env.SUPPORTED_COINS.split(',')

export default class RShake extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    try {
      const isServerRendered = !!ctx.req

      let pageProps
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      // Collect props for global components Sidebar and Searchbar
      let globalProps = { coin: 'btc', heights: [{btc: '?'}], COINS: COINS }
      if (isServerRendered) {
        globalProps.coin = ctx.req.params.coin || 'btc'
      }

      // get heights for sidebar
      let heights = []
      for (const coin of COINS) {
        try {
          let req = await fetch(EX_API + coin + '/height')
          let data = await req.json()
          heights.push({coin: coin, height: data})
        } catch (err) {
          console.err(err)
          heights.push({coin: coin, height: '?'})
        }
      }
      globalProps.heights = heights

      let allProps = Object.assign({}, pageProps, globalProps)
      console.log(allProps)
      return { allProps }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  componentDidMount () {
    if (this.props.isServerRendered) {
      // overrideCache(APP_PROPS, this.props.latest)
    }
  }

  render () {
    const { Component, allProps } = this.props
    return (
      <Container>
        <Nav {...allProps} />
        <SideBar {...allProps} />
        <Component {...allProps} />
      </Container>
    )
  }
}
