import { h } from "hyperapp"
import Spinner from '../components/Spinner.js'
import PeopleTable from '../components/PeopleTable.js'
import Pagination from '../components/Pagination.js'

const People = module.exports = (state, actions) => <div key='people'>
    <h2>People list</h2>
    <div class="columns">
        <div class="column col-lg-12" oncreate={() => actions.load(window.g_urls.persons)}>
            {state.loading == true ? <Spinner /> : <PeopleTable people={state} actions={actions} />}
        </div>
    </div>
    <Pagination page={state.page} next={state.next} previous={state.previous} actions={actions} />
</div>
