import React from 'react'

export default class ErrorPage extends React.Component {
  static getInitialProps ({ res, err }) {
    console.log('CATCHING ErrorPage getInitialProps')
    console.log(err)
    console.log(res.statusCode)
    if (err) {
      console.log(err)
      //res.writeHead(302, {
      //Location: '/'
      //})
      //res.end()
    }
    return {}
  }

  render () {
    return (
      <div>

        <h1>Custom ErrorPage HELLO</h1>
        <p>
          {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
        </p>
      </div>
    )
  }
}
