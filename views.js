import { h } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import Input from './components/Input.js'
import Table from './components/Table.js'
import People from './components/People.js'
import MoviesTable from './components/MoviesTable.js'

import Spinner from './components/Spinner.js'
import Empty from './components/Empty.js'
import FilmsView from './components/FilmsView.js'
import Pagination from './components/Pagination.js'
import PersonModal from './components/PersonModal.js'
import ToastContainer from './components/ToastContainer.js'
import Tabs from './components/Tabs.js'

import Home from './views/Home.js'
import Movies from './views/Movies.js'

export const main = (state, actions) => <div class='container grid-xl'>
    <Tabs />
    <Route path="/" render={Home} />
    <Route path="/movies" render={Movies} />
</div>

