import { h } from "hyperapp"
import Spinner from '../components/Spinner.js'
import MoviesTable from '../components/MoviesTable.js'
import Pagination from '../components/Pagination.js'

const Movies = module.exports = (state, actions) => <div>
    <h2>Movie list</h2>
    <div class="columns">
        <div class="column col-lg-12" oncreate={() => {
            console.log("Create movies");
            actions.load(window.g_urls.movies)
        }
        
        }>
            {state.loading == true ? <Spinner /> : <MoviesTable movies={state} actions={actions} />}
        </div>
    </div>
    <Pagination page={state.page} next={state.next} previous={state.previous} actions={actions} />
</div>
