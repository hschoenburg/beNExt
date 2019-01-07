const Sidebar = (props) => (
  <div>
    <h2>Sidebar</h2>
    <p>Latest Blocks</p>
    <ul>
      {props.latest.map(b => 
        <li key={b.height}>Height: {b.height} </li>
      )}

    </ul>
  </div>
)

export default Sidebar
