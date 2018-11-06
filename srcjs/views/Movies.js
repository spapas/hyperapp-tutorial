import { h } from "hyperapp"
import PlotModal from '../components/PlotModal.js';
import MultiModalForm from '../components/MultiModalForm';
import FilterTableView from './FilterTableView.js';

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
  (movie) => movie.id,
  (movie) => movie.title,
  (movie) => movie.release_year,
  (movie) => movie.runtime,
  (movie) => movie.genres.map(z => <span className='chip bg-dark'><a class='text-secondary text-norma' href=''>{z.name}</a></span>),
  (movie, actions) => <span onclick={()=>actions.updateShowPlot(movie)}>{movie.story.substring(0,50) + '...'}</span>,
  (movie, actions) => <div>
    <button className='btn btn-block btn-primary' onclick={()=>actions.updateEdit(Object.assign({}, movie) )}>Edit</button>
    <button className='btn btn-block btn-primary' onclick={()=>actions.updateEditPeople(Object.assign({}, movie) )}>Edit people</button>
  </div>
];


const formFields = [
  {'key': 'title', 'label': 'Title', 'type': 'text'},
  {'key': 'release_year', 'label': 'Release Year', 'type': 'number'},
  {'key': 'runtime', 'label': 'Runtime', 'type': 'number'},
  {'key': 'story', 'label': 'Plot', 'type': 'longtext'},
  {'key': 'genres', 'label': 'Genres', 'type': 'multiselect', url: '/api/genres/'},
];

const multiFormFields = [
  {'key': 'person', 'label': 'Person', 'type': 'text'},
  {'key': 'job', 'label': 'Job', 'type': 'text'},
]

const extraViews = [
  (state, actions) => <div>{state.movies.showPlot?<PlotModal movie={state.movies.showPlot} actions={actions} />:null}</div>,
  (state, actions) => <div>{state.movies.forms.editPeople?<div>WILL EDIT<MultiModalForm
    loading={state.movies.loading}
    //formFields={mergeValuesErrors(formFields, state.movies.forms.editPeople, state.movies.forms.editPeople.errors)}
    formFields={multiFormFields}
    item={state.movies.forms.editPeople}
    hideAction={()=>actions.updateEditPeople(null)}
    saveAction={()=>actions.saveEditPeople({g_actions: g_actions, key: state.auth.key})}
    updateFieldAction={(key, value)=>actions.updateField({formname: 'edit', fieldname: 'movies', value})}
  /></div>:null}</div>
]

const Movies = FilterTableView({
  key: 'movies',
  rowHeaders,
  rowColumns,
  formFields,
  title: 'Movies list',
  extraViews
})

module.exports = Movies;