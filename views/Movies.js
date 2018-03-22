import { h } from "hyperapp"
import Spinner from '../components/Spinner.js'
import PlotModal from '../components/PlotModal.js'

import Table from '../components/Table.js'
import ModalForm from '../components/ModalForm.js'

const rowHeaders = [
    'Id',
    'Title',
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
    (movie, actions) => <button class='btn btn-block btn-primary' onclick={()=>actions.updateEdit(Object.assign({}, movie) )}>Edit</button>
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
        'render': (movie, actions) => movie.id
    } // etc
]


const formFields = [
    {'key': 'title', 'label': 'Title', 'type': 'text'},
    {'key': 'release_year', 'label': 'Release Year', 'type': 'number'},
    {'key': 'runtime', 'label': 'Runtime', 'type': 'number'},
    {'key': 'story', 'label': 'Plot', 'type': 'longtext'},
]

const Movies = module.exports = (state, actions) => <div key='movies'>
    <h2>
        Movie list &nbsp;  &nbsp;
        <button class="btn btn-primary btn-action btn-lg" onclick={()=>actions.updateEdit({})}>
            <i class="icon icon-plus"></i>
        </button>
    </h2>
    <div class="columns">
        <div class="column col-lg-12" oncreate={() => actions.load(window.g_urls.movies)}>
            {state.movies.loading == true ? <Spinner /> : <Table 
                rowHeaders={checkAuth(rowHeaders, state.auth)} 
                rowColumns={checkAuth(rowColumns, state.auth)} 
                rows={state.movies} 
                actions={actions} 
            />}
        </div>
    </div>
    1{JSON.stringify(state.movies.forms.edit)}2
    {state.movies.showPlot?<PlotModal movie={state.movies.showPlot} actions={actions} />:null}
    {state.movies.forms.edit?<ModalForm 
                            formFields={formFields} 
                            item={state.movies.forms.edit} 
                            hideAction={()=>actions.updateEdit(null)} 
                            saveAction={()=>actions.saveEdit(state.auth.key)} 
                            updateFieldAction={(key, value)=>actions.updateField({formname: 'edit', fieldname: key, value})} 
                            />:null}
</div>
