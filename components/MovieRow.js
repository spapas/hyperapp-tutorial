const { h } = require('hyperapp')

const MovieRow = module.exports = ({ movie, actions }) => <tr>
    <td>{movie.id}</td>
    <td>{movie.title}</td>
    <td>{movie.release_year}</td>
    <td>{movie.runtime}</td>
    <td>{movie.genres.map(z => <span class='chip bg-dark'><a class='text-secondary text-norma' href=''>{z.name}</a></span>)}</td>
    <td><span onclick={()=>actions.updateShowPlot(movie)}>{movie.story.substring(0,50) + '...'}</span></td>
    <td><button class='btn btn-block btn-primary' onclick={()=>actions.movies.displayModal(movie.id)}>Edit</button></td>
</tr>

