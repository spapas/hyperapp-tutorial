import { h } from "hyperapp"
import Spinner from '../components/Spinner.js'
import PlotModal from '../components/PlotModal.js'

import Table from '../components/Table.js'

const rowHeaders = [
    'Id',
    'Name',
    'Release year',
    'Runtime',
    'Genres',
    'Plot',
    'Edit'
]

const rowColumns = [
    (movie, actions) => movie.id,
    (movie, actions) => movie.title,
    (movie, actions) => movie.release_year,
    (movie, actions) => movie.runtime,
    (movie, actions) => movie.genres.map(z => <span class='chip bg-dark'><a class='text-secondary text-norma' href=''>{z.name}</a></span>),
    (movie, actions) => <span onclick={()=>actions.updateShowPlot(movie)}>{movie.story.substring(0,50) + '...'}</span>,
    (movie, actions) => <button class='btn btn-block btn-primary' onclick={()=>actions.movies.displayModal(movie.id)}>Edit</button>
]

const checkAuth = (list, auth) => {
    if(auth.key) return list
    return list.slice(0, -1);
}

// TODO: Maybe this is better
const tableDef = [
    {
        'key': 'id',
        'label': 'Id',
        'render': (movie, actions) => movie.id,
    }
]

const Movies = module.exports = (state, actions) => <div key='movies'>
    <h2>Movie list</h2>
    <div class="columns">
        <div class="column col-lg-12" oncreate={() => actions.load(window.g_urls.movies)}>
            {state.movies.loading == true ? <Spinner /> : <Table rowHeaders={checkAuth(rowHeaders, state.auth)} rowColumns={checkAuth(rowColumns, state.auth)} rows={state.movies} actions={actions} />}
        </div>
    </div>
    {state.movies.showPlot?<PlotModal movie={state.movies.showPlot} actions={actions} />:null}
</div>
