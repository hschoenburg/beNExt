const Block = (props) => {
  let p = props
  return (
    <div>
      <h3 className='title'>Block: {p.hash}</h3>
    </div>
  )
}

export default Block
