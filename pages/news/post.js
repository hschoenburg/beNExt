import React from 'react'
// import {withRouter} from 'next/router'
import Head from '../../components/head'
// import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostPage = (props) => (
  <div>
    <Head title='Post' />
    <div className='hero'>
      <h1 className='title'>Post: {props.title}</h1>
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

PostPage.getInitialProps = async ({ req }) => {
  let request = await fetch(process.env.SERVER_URL + '/api/news/post/' + req.params.title)
  let data = await request.json()
  return data
}

export default PostPage
