import { h } from 'hyperapp'

import { Link } from "@hyperapp/router"

const createTab = (url, title) => (currentLocation) => <li className={`tab-item ${currentLocation.pathname==url?'active':''}`}>
    <Link to={url}>{title}</Link>
  </li>


const Table = module.exports = ({currentLocation, auth, actions}) => <ul class="tab tab-block">
  {createTab("/", "Home")(currentLocation)}
  {createTab("/movies", "Movies")(currentLocation)}
  {createTab("/people", "People")(currentLocation)}
  {createTab("/genres", "Genres")(currentLocation)}
  {createTab("/jobs", "Jobs")(currentLocation)}
  {auth.key?<div>
    <span class='chip'>
      {auth.username}
    </span>
    <button class='btn' onclick={()=>actions.auth.logout(actions)}>Logout</button>
  </div>:<li className={`tab-item ${currentLocation.pathname=='/login'?'active':''}`}>
   <Link to="/login">Login</Link>
  </li>
  }
</ul>
