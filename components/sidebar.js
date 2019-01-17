const SideBar = (props) => (
  <div>
    <h2>SideBar</h2>
    <p>Latest Blocks</p>
    <ul>
      {props.latest.map(b => 
        <li key={b.height}> {b.height} : {b.hash} </li>
      )}

    </ul>
  </div>
)

export default SideBar
