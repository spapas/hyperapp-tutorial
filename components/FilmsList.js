const { h } = require('hyperapp')


const FilmsList = module.exports = ({ films, actions }) => <button class='btn'
    onclick={()=>actions.loadFilms(films)}
    >
    Load
</button>