const { h } = require('hyperapp')
import FilmCard from './FilmCard.js'

const FilmsView = module.exports = ({films}) => <div>
    {films.map(f => <FilmCard film={f} />)}
</div>