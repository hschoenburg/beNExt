import React from 'react'

const ErrorMsg = props => (
  <div>
    <p>{props.message}</p>

    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
)

export default ErrorMsg
