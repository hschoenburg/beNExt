import React from 'react'
import App, { Container } from 'next/app'
import fetch from 'isomorphic-unfetch'

import SideBar from '../components/sidebar'
import SearchBar from '../components/searchbar'
import Nav from '../components/nav'
import cachedFetch, { overrideCache } from '../lib/cached_json_fetch'

const APP_PROPS = process.env.SERVER_URL + '/api/btc/latest'

export default class RShake extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    try {
      const coins = process.env.SUPPORTED_COINS.split(',')
      const isServerRendered = !!ctx.req

      // Collect props for global components Sidebar and Searchbar
      let latest = [{height: 222, hash: 234234}] //await cachedFetch(APP_PROPS)
      let globalProps = { coins, latest, isServerRendered }

      let pageProps
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      globalProps.coin = 'btc'
      if (isServerRendered) {
        globalProps.coin = ctx.req.params.coin || 'btc'
      }

      let allProps = Object.assign({}, pageProps, globalProps)
      return { allProps }
    } catch (err) {
      throw err
    }
  }

  componentDidMount () {
    if (this.props.isServerRendered) {
      overrideCache(APP_PROPS, this.props.latest)
    }
  }

  render () {
    const { Component, allProps } = this.props
    return (
      <Container>
        <Nav />
        <SideBar {...allProps} />
        <SearchBar {...allProps} />
        <Component {...allProps} />
      </Container>
    )
  }
}
