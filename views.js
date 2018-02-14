import { h } from "hyperapp"
import Input from './components/Input.js'
import Table from './components/Table.js'
import People from './components/People.js'
import Movies from './components/Movies.js'

import Spinner from './components/Spinner.js'
import Empty from './components/Empty.js'
import FilmsView from './components/FilmsView.js'
import Pagination from './components/Pagination.js'
import PersonModal from './components/PersonModal.js'
import ToastContainer from './components/ToastContainer.js'

export const home = (state, actions) => <div class='container grid-xl'>
    <h2>Movie list</h2>
  <div class="columns">
    <div class="column col-lg-12" oncreate={() => actions.movies.load(window.g_urls.movies)}>
        {state.movies.loading == true ? <Spinner /> : <Movies movies={state.movies} actions={actions.movies} />}
    </div>

  </div>
</div>

export const detail = (state, actions) => <div>
    {state.loading == true ? <Spinner /> : <div>{state.person.name}</div>}
</div>

