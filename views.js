import { h } from "hyperapp"
import Input from './components/Input.js'
import Table from './components/Table.js'
import People from './components/People.js'

import Spinner from './components/Spinner.js'
import Empty from './components/Empty.js'
import FilmsView from './components/FilmsView.js'
import Pagination from './components/Pagination.js'
import PersonModal from './components/PersonModal.js'
import ToastContainer from './components/ToastContainer.js'

export const home = (state, actions) => <div class="columns">
     <div class="column col-6" oncreate={() => actions.loadPeople('https://swapi.co/api/people/')}>
        <PersonModal person={state.person} loading={state.loading} actions={actions} />

        <ToastContainer toasts={state.toasts} actions={actions} />
        {state.loading == true ? <Spinner /> : <People people={state.people} actions={actions} />}
        <Pagination actions={actions} page={state.page} next={state.people.next} previous={state.people.previous} />
    </div>
    <div class="column col-6">
        {
            state.loadingFilms?<Spinner />:(
                state.films&&state.films.length?<FilmsView films={state.films} />:<Empty />
            )
        }
    </div>
</div>

export const detail = (state, actions) => <div>
    {state.loading == true ? <Spinner /> : <div>{state.person.name}</div>}
</div>

