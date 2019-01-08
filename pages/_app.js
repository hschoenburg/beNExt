import React from 'react'
import App, { Container } from 'next/app'
//import fetch from 'isomorphic-unfetch'

import Sidebar from '../components/sidebar'
import Nav from '../components/nav'

export default class RShake extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let query = await fetch(process.env.SERVER_URL + '/api/btc/head')
    let latest = query.json()

    let pageProps
    let sideBarProps = {latest: latest}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    let allProps = Object.assign({}, pageProps, sideBarProps)
    return { allProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Nav />
        <Sidebar {...this.props.allProps} />
        <Component {...pageProps} />
      </Container>
    )
  }
}
