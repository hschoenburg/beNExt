import React from 'react'
import App, { Container } from 'next/app'
import fetch from 'isomorphic-unfetch'

import Sidebar from '../components/sidebar'
import Nav from '../components/nav'
import cachedFetch, { overrideCache } from '../lib/cached_json_fetch'

const APP_PROPS = process.env.SERVER_URL + '/api/btc/latest'

export default class RShake extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    try {
      let latest = [{height: 222, hash: 234234}] //await cachedFetch(APP_PROPS)
      const isServerRendered = !!ctx.req
      let sideBarProps = { latest, isServerRendered }
      let pageProps
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
      let allProps = Object.assign({}, pageProps, sideBarProps)
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
        <Sidebar {...this.props.allProps} />
        <Component {...this.props.allProps} />
      </Container>
    )
  }
}
