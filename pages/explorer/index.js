import React from 'react'
import Head from '../../components/head'
import Link from 'next/link'
import Search from '../../components/search'
import ErrorMsg from '../../components/utils/error_msg'
import Block from '../../components/block'
import Address from '../../components/address'


// Container Component with Search bar and History functionality
class Explorer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: props.error || null,
      type: props.type,
      term: props.term,
      history: []
      // fill history with objects of type
      // {type: 'block/tx/addr', val: ""}
    }
  }

  focusExplorer = (error, data) => {
    let s = this.state
    let newState = Object.assign({}, this.state, data)
    if(error) {
      newState.error = error
    } else {
      if(s.type) {
        let existing = s.history.find(el => { return (el.type === newState.type && el.term === newState.term) })
        
        if(!existing) {
            newState.history.push({type: newState.type, term: newState.term})
        }
      }
    }
    this.setState(newState)
  }

  popHistory = () => {
    let newState = Object.assign({}, this.state)
    let previous = newState.history.pop()
    Object.assign(newState, previous)
    this.setState(newState)
  }


  render () {

    let focus = <h3>Default Focus State</h3>
    let s = this.state

    if (s.has_error) {
      focus = <ErrorMsg message={'Sorry Something Went Really Wrong'} />
    }

    if(s.term) {
      switch (s.type) {
        case 'block':
          focus = <h2>Block hash: {s.term}</h2>
            //<Block hash={s.term} />
          break
        case 'height':
          focus = 
            focus = <h2>Block height: {s.term}</h2>
            //<Block height={s.term} />
          break
        case 'tx':
          focus = <h2>Tx: {s.term}</h2>
          break
        case 'addr':
          focus = <h2>Address: {s.term}</h2>
            // focus = <Address address={this.state.term} />
          break
      }
    }

    return (
    <div>
      <Head title="Explorer" />

      <div className="hero">
        <h1 className="title">Bcoin Explorer</h1>
        <p className="description">
          Make Crypto Useful
        </p>
      </div>
      <div className="row">
        <Search update={this.focusExplorer} />
      </div>
      <div className="row">
        {focus}
      </div>
      <div className="row">
        <History back={this.popHistory} entries={s.history} /> 
      </div>

      <style jsx>{`
        .hero {
            width: 100%;
            color: blue;
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
  }
}

const History = (props) => {
  if(props.entries) { 
    return (
      <div>
        <p>History: {props.entries.length}</p>
        <a onClick={props.back}> Back</a>
        <ul>
          { props.entries.map((h, i) => {
            return (
              <li key={h.term+h.type}>Type: {h.type}</li>
            )
          })}
        </ul>
      </div>
    ) 
  } else {
    return (
      <div></div>
    )
  }
}

Explorer.getInitialProps = (data) => {
  console.log(data)
  return {type: data.query.type || null, term: data.query.term || null}
}


export default Explorer
