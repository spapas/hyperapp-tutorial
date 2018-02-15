const { h } = require('hyperapp')
import MovieRow from './MovieRow.js'
import PlotModal from './PlotModal.js'

const MoviesTable = module.exports = ({ movies, actions }) => <div>
    <table class="table table-striped table-hover">
        <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>Release year</th>
            <th>Runtime</th>
            <th>Genres</th>
            <th>Plot</th>
            <th>Edit</th>
        </tr></thead>
        <tbody>
            {
                movies.items.map(z => <MovieRow movie={z} actions={actions}/>)
            }
        </tbody>
    </table>
    {movies.showPlot?<PlotModal movie={movies.showPlot} actions={actions} />:null}
</div>
