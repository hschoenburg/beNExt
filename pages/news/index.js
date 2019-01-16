import React from 'react'
// import {withRouter} from 'next/router'
import Head from '../../components/head'
// import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const NewsPage = (props) => (
  <div>
    <Head title='News' />
    <div className='hero'>
      <h1 className='title'>News!</h1>
      <p>Posts {JSON.stringify(props.posts) }</p>
      <p>Category: {props.category} </p>
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

NewsPage.getInitialProps = async ({ req }) => {
  let request = await fetch(process.env.SERVER_URL + '/api/news/posts/all')
  let data = await request.json()
  return data
}

export default NewsPage
