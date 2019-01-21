const SideBar = (props) => (
  <div>
    <h2>SideBar</h2>
    <p>Latest Blocks</p>
    <ul>
      {props.heights.map(b => {
        return (<li key={b.coin + b.height}> {b.coin}: {b.height} </li>)
      })}

    </ul>
  </div>
)

export default SideBar
