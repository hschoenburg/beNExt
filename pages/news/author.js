import React from 'react'
// import {withRouter} from 'next/router'
import Head from '../../components/head'
// import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const AuthorPage = (props) => (
  <div>
    <Head title='Author' />
    <div className='hero'>
      <h1 className='title'>Author: {props.author}</h1>
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

AuthorPage.getInitialProps = async ({ req }) => {
  let request = await fetch(process.env.SERVER_URL + '/api/news/author/' + req.params.author)
  let data = await request.json()
  return data
}

export default AuthorPage
