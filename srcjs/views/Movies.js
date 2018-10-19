import { h } from "hyperapp"
import PlotModal from '../components/PlotModal.js';
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
  (movie, actions) => <button className='btn btn-block btn-primary' onclick={()=>actions.updateEdit(Object.assign({}, movie) )}>Edit</button>
];


const formFields = [
  {'key': 'title', 'label': 'Title', 'type': 'text'},
  {'key': 'release_year', 'label': 'Release Year', 'type': 'number'},
  {'key': 'runtime', 'label': 'Runtime', 'type': 'number'},
  {'key': 'story', 'label': 'Plot', 'type': 'longtext'},
];

const extraView = (state, actions) => <div>{state.movies.showPlot?<PlotModal movie={state.movies.showPlot} actions={actions} />:null}</div>

const Movies = FilterTableView({
  key: 'movies',
  rowHeaders,
  rowColumns,
  formFields,
  title: 'Movies list',
  extraView
})

module.exports = Movies;