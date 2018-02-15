import { h } from "hyperapp"

import { Link } from "@hyperapp/router"

const Table = module.exports = ({currentLocation}) => <ul class="tab tab-block">
  <li className={`tab-item ${currentLocation.pathname=='/'?'active':''}`}>
    <Link to="/">Home</Link>
  </li>
  <li className={`tab-item ${currentLocation.pathname=='/movies'?'active':''}`}>
    <Link to="/movies">Movies</Link>
  </li>
  <li className={`tab-item ${currentLocation.pathname=='/people'?'active':''}`}>
    <Link to="/people">People</Link>
  </li>
  <li className={`tab-item ${currentLocation.pathname=='/login'?'active':''}`}>
    <Link to="/login">Login</Link>
  </li>
</ul>
